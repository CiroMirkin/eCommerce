"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@auth"

export const getOrderById = async (id: string) => {

    const session = await auth()

    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        size: true,
                        quantity: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,
                        
                                ProductImage: {
                                    select: { url: true },
                                    take: 1,
                                },
                            },
                        },
                    },
                },
            },
        })

        if(!order) throw `The order does not exist. ID: "${id}"`
        if(session?.user.role === 'client') {
            if(session.user.id !== order.userId) {
                throw "The order does not belong to the user who is requesting it."
            }
        }

        return { 
            ok: true,
            message: "We find the order.",
            order,
        }
    }
    catch (e) {
        console.error("getOrderById Action", e)
        return {
            ok: false,
            message: "We couldn't find the order.",
        }
    }
}