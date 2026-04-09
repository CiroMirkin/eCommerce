"use server"

import { UserRole } from "@/interfaces"
import { prisma } from "@/lib/prisma"
import { auth } from "@auth"
import { revalidatePath } from "next/cache"

export const changeUserRole = async (userId: string, newRole: UserRole) => {
    const session = await auth()
    if(session?.user.role !== 'admin') {
        return {
            ok: false,
            message: "The user is not admin.",
        }
    }
    
    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                role: newRole === 'admin' ? 'admin' : 'client',
            },
        })

        if(!user) {
            return {
                ok: false,
                message: "It was not possible to update the user's role.",
            }
        }

        revalidatePath('/admin/users')

        return {
            ok: true,
            message: "The user's role was successfully updated.",
        }

    }
    catch {
        return {
            ok: false,
            message: "It was not possible to update the user's role.",
        }
    }
}