import { prisma } from '@/lib/prisma';
import { SeedUser } from '@/seed/seed';
import bcrypt from 'bcryptjs';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  providers: [
    Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ 
                    email: z.email(), 
                    password: z.string().min(6),
                })
                .safeParse(credentials)
            
            if(!parsedCredentials.success) {
                return null
            }

            const { email, password } = parsedCredentials.data

            const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() }})
            if(!user) return null
            if(!bcrypt.compareSync(password, user.password)) return null

            const userWithoutPassword = { ...user } as Partial<SeedUser>
            delete userWithoutPassword.password
            return userWithoutPassword
        },
    }),
  ],
}

export const { signIn, signOut, auth } = NextAuth(authConfig)
