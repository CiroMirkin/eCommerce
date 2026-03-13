import { type Product as ProductInterface } from "@/interfaces";
import { Product } from "./Product";

interface Props {
    products: ProductInterface[]
}

export function ProductGrid({ products }: Props) {
    return (
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-px gap-y-6">
            {products.map(product => (
                <Product key={product.slug} product={product} />
            ))}
        </ul>
    )
}