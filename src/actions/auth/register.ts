"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

interface RegisterData {
    name: string
    password: string
    email: string
}

export const registerUser = async ({ name, password, email}: RegisterData) => {
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        })

        return {
            ok: true,
            user,
            message: "The user was created successfully.",
        }

    }
    catch (error) {
        console.error("registerUser Action: ", error)
        return {
            ok: false,
            message: "It was not possible to create the user.",
        }
    }
}
