"use server"

import { prisma } from "@/lib/prisma"

export const deleteUserAddress = async (userId: string) => {
    try {
        await prisma.userAddress.delete({ where: { userId }})
        return {
            ok: true,
            message: "Your address was successfully deleted."
        }
    }
    catch(error) {
        console.error("deleteUserAddress Action: ", error)
        return {
            ok: false,
            message: "Sorry, we weren't able to delete your address. Please try again later.",
        }
    }
}