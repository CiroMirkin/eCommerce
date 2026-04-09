"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@auth"


export const getPaginatedOrders = async () => {
    const session = await auth()
    if(session?.user.role !== 'admin') {
        return {
            ok: false,
            message: "The user is not admin.",
        }
    }
    
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                OrderAddress: true,
            },
        })

        return {
            ok: true,
            message: "User commands found.",
            orders: orders || [],
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