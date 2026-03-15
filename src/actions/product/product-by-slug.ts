"use server"

import { categoryToProductType, Product } from "@/interfaces"
import { prisma } from "@/lib/prisma"

export const getProductBySlug = async (slug: string): Promise<Product> => {
    try {
        const product = await prisma.product.findUnique({
            include: {
                ProductImage: {
                    select: {
                        url: true,
                    },
                },
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            where: {
                slug,
            },
        })

        if(!product) {
            throw new Error('Producto no encontrado por slug.')
        }

        return {
            ...product,
            type: categoryToProductType[product.category.name],
            sizes: product.size,
            images: product.ProductImage.map(img => img.url),
        }
    } catch (error) {
        console.error("getProductBySlug() ", error)
        throw new Error('Error al obtener producto por slug.')
    }
}