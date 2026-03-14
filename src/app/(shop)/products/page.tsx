import { Pagination, ProductGrid } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
    searchParams: Promise<{
        page?: string
    }>
}

export default async function ProductsPage({ searchParams }: Props){
    const pageParam = (await searchParams).page
    const page = pageParam ? parseInt(pageParam) : 1
    const { products, totalPages } = await getPaginatedProductsWithImages({ page })
    
    if(products.length === 0) {
        redirect('/products')
    }

    return (
        <>
            <ProductGrid products={products} />
            <Pagination totalPages={totalPages} />
        </>
    )
}