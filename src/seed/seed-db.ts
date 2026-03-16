import { prisma } from "@/lib/prisma";
import { initialData } from "./seed";

async function main() {
    await prisma.user.deleteMany({})

    await prisma.productImage.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.category.deleteMany({})

    const { categories, products, users } = initialData

    // Categories
    const categoriesData = categories.map(category => ({
        name: category
    }))
    const categoriesDB = await prisma.category.createManyAndReturn({ 
        data: categoriesData, 
    })
    
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[ category.name.toLocaleLowerCase().split(' ').join('-') ] = category.id
        return map
    }, {} as Record<string, string>)

    // Products
    products.forEach(async ({ type, sizes, images, ...product }) => {
        const productDB = await prisma.product.create({
            data: {
                ...product,
                size: sizes,
                categoryId: categoriesMap[type],
            }
        })

        const imagesData = images.map((img: string) => ({
            url: img,
            productId: productDB.id,
        }))
        await prisma.productImage.createMany({
            data: imagesData,
        })
    })

    // Users
    await prisma.user.createMany({ data: users })

    console.log("\n\nSEED ejecutado correctamente :)")
}

(() => {
    if(process.env.NODE_ENV === 'production') return
    main()
})();
