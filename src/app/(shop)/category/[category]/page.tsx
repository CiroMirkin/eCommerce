import { getPaginatedProductsWithImages } from "@/actions"
import { Pagination, ProductGrid, Title } from "@/components"
import { productTypeToCategory, ProductTypes } from "@/interfaces"
import { redirect } from "next/navigation"

interface Props {
    params: Promise<{
        category: string
    }>
    searchParams: Promise<{
        page?: string
    }>
}

async function CategoryPage({ params, searchParams }: Props){
    const { category } = await params
    const pageParam = (await searchParams).page
    const page = pageParam ? parseInt(pageParam) : 1
    const { products, totalPages } = await getPaginatedProductsWithImages({ 
        page,
        category: category as ProductTypes
    })
    
    if(products.length === 0) {
        redirect('/products')
    }

    return (
        <>
            <header>
                <Title>{ productTypeToCategory[category as ProductTypes] }</Title>
            </header>
            <ProductGrid products={products} />
            <Pagination totalPages={totalPages} />
        </>
    )
}

export default CategoryPage