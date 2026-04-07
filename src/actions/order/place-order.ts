"use server"

import type { Address, ProductToOrder } from "@/interfaces"
import { prisma } from "@/lib/prisma"
import { auth } from "@auth"
import { calculateOrderTotals } from "./calculateOrderTotals"

export const placeOrder = async (productsToOrder: ProductToOrder[], address: Address) => {
    try {
        const session = await auth()
        const userId = session!.user.id

        if(!userId) throw Error("There is no user session.")

        const products = await prisma.product.findMany({
            where: {
                id: { 
                    in: productsToOrder.map(p => p.productId),
                },
            },
        })

        const { 
            itemsInOrder,
            subTotal,
            tax,
            total
        } = calculateOrderTotals(productsToOrder, products)

        const prismaTx = await prisma.$transaction(async tx => {

            const updatedProductsPromises = products.map( async product => {
                const productQuantity = productsToOrder
                    .filter(p => p.productId === product.id)
                    .reduce((acc, item) => item.quantity + acc, 0)

                if(productQuantity === 0) {
                    throw new Error(`Product ${product.id} has no quantity assigned.`)
                }

                return tx.product.update({
                    where: { id: product.id },
                    data: { 
                        inStock: { decrement: productQuantity },
                    },
                })
            })

            const updatedProducts = await Promise.all(updatedProductsPromises)

            updatedProducts.forEach(product => {
                if(product.inStock < 0) {
                    throw new Error(`Product ${product.title} is out of stock; try ordering fewer items.`)
                }
            })

            // Order

            const getProductPrice = (productId: string): number => {
                const price = products.find(product => product.id === productId)?.price
                if (!price) throw new Error(`Product ${productId} not found or has no price. The price of ${productId} was ${price}.`)
                return price
            }

            const order = await tx.order.create({
                data : {
                    userId,

                    itemsInOrder,
                    subTotal,
                    tax,
                    total,

                    OrderItem: {
                        createMany: {
                            data: productsToOrder.map(p => ({
                                ...p,
                                price: getProductPrice(p.productId),
                            })),
                        },
                    },
                }
            })

            // Order Address

            const { country,...orderAddressData } = address
            console.log(orderAddressData)
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...orderAddressData,
                    countryId: country,
                    orderId: order.id,
                }
            })
            
            return {
                updatedProducts,
                order,
                orderAddress,
            }
        })

        return {
            ok: true,
            order: prismaTx.order,
            prismaTransaction: prismaTx,
            message: "The order was  successfully processed.",
        }
    } 
    catch (error) {
        console.error("placeOrder Action:", error)
        return {
            ok: false,
            message: "The order could not be processed.",
        }
    }
}