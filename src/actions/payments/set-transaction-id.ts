"use server"

import { prisma } from "@/lib/prisma"

export const setTransactionId = async (orderId: string, transactionId: string) => {
    if(!orderId) throw "Empty orderId"
    if(!transactionId) throw "Empty transactionId"

    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { transactionId },
        })

        if(!order) {
            return {
                ok: false,
                message: "The order associated with this transaction could not be found.", 
            }
        }

        return {
            ok: true,
            message: "",
        }
    }
    catch(e) {
        console.error(e)
        return {
            ok: false,
            message: "It was not possible to update the transaction ID.",
        }
    }
}