"use server"

import { categoryToProductType, ProductTypes } from "@/interfaces"
import { prisma } from "@/lib/prisma"

interface Response {
    categories: { 
        type: ProductTypes
        category: string
     }[]
}

export const getCategories = async (): Promise<Response> => {
    try {
        const categories = await prisma.category.findMany({})
        return {
            categories: categories.map(category => ({
              type: categoryToProductType[category.name],
              category: category.name,
            })),
        }
    } catch (error) {
        console.error("getCategories() ", error)
        throw new Error('No fue posible cargar las categorías disponibles.')
    }
}
