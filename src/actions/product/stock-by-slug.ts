"use server"

import { prisma } from "@/lib/prisma"

interface Response {
    stock: number
}

export const getProductStockBySlug = async (slug: string): Promise<Response> => {
        try {
        const product = await prisma.product.findUnique({
            where: { slug },
            select: { inStock: true },
        })

        return {
            stock: product?.inStock || 0,
        }
    } catch (error) {
        return { 
            stock: 0,
        }
    }
}