"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@auth"

export const getUsers = async () => {
    const session = await auth()
    if(session?.user.role !== 'admin') {
        return {
            ok: false,
            message: "The user is not admin.",
        }
    }
    
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                name: 'desc',
            },
        })
        
        return {
            users: users || [],
            ok: true,
        }
    }
    catch {
        return {
            ok: false,
            users: [],
        }
    }
}