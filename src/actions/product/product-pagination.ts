"use server"

import { Product } from "@/interfaces"
import { prisma } from "@/lib/prisma"

interface PaginationOptions {
    page?: number
    take?: number
}

interface Response {
    products: Product[]
    currentPage: number
    totalPages: number
}

export const getPaginatedProductsWithImages = async (options: PaginationOptions): Promise<Response> => {
    try {
        let { page = 1, take = 16 } = options
        if(isNaN(Number(page)) || page < 1) page = 1
        if(isNaN(Number(take))) take = 16
        
        const skip = ( page - 1) * take // Es -1 para incluir la pagina 0

        const [products, totalProducts] = await Promise.all([
            prisma.product.findMany({
                take,
                skip,
                include: { 
                    ProductImage: {
                        take: 2,
                        select: {
                            url: true,
                        },
                    },
                },
            }),
            prisma.product.count({})
        ])

        // 41 / 10 = 4.1 -> Math.ceil(41 / 10) = 5 
        // Math.ceil nos permite obtener el siguiente entero de una división en vez de una fracción.
        const totalPages = Math.ceil(totalProducts/take) 

        return {
            totalPages,
            currentPage: page,
            products: products.map(product => ({
                ...product,
                sizes: product.size,
                images: product.ProductImage.map(img => img.url),
            }))
        }
    } 
    catch (error) {
        console.error("getPaginatedProductsWithImages - ", error)
        throw new Error('No fue posible cargar los productos.')
    }
}
