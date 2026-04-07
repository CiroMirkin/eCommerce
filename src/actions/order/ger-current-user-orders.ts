"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@auth"

export const getCurrentUserOrders = async () => {
    const session = await auth()
    if(!session?.user) {
        return {
            ok: false,
            message: "The user is not logged in.",
        }
    }
    
    try {
        const user = session!.user
        const orders = await prisma.order.findMany({
            where: {
                userId: user.id,
            },
            include: {
                OrderAddress: true,
            },
        })

        if(!orders) throw "This user has no orders."

        return {
            ok: true,
            message: "User commands found.",
            orders,
        }
    }
    catch(e) {
        console.error("getOrdersByUser Action: ", e)
        return {
            ok: false,
            message: "User orders could not be retrieved.",
        }
    }
}
