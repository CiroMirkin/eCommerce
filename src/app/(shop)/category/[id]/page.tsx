import { ProductGrid, Title } from "@/components"
import { Product } from "@/interfaces"
import { initialData } from "@/seed/seed"
import { notFound } from "next/navigation"

const allProducts: Product[] = initialData.products

interface Props {
    params: Promise<{
        id: string
    }>
}

async function CategoryPage({ params }: Props){
    const { id: genre } = await params

    /* if(genre === 'pipi') {
        notFound()
    } */

    const products = allProducts.filter(p => p.gender === genre)

    return (
        <>
            <header>
                <Title>{genre}</Title>
            </header>
            <ProductGrid products={products} />
        </>
    )
}

export default CategoryPage