import { ProductGrid } from "@/components";
import { initialData } from "@/seed/seed";

const products =initialData.products


export default function ProductsPage(){
    return (
        <>
            <ProductGrid products={products} />
        </>
    )
}