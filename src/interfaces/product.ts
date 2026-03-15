
export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    type: ProductTypes;
}

export interface CartProduct {
    id: string
    slug: string
    title: string
    price: number
    quantity: number
    size: Size
    image: string
}

export const getCartProduct = (
    { product, size, quantity }:
    { product: Product, size: Size, quantity: number }
): CartProduct => ({ 
    size,
    quantity, 
    price: product.price,
    title: product.title,
    id: product.id,
    image: product.images[1],
    slug: product.slug,
})

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';

export type ProductTypes = "women" | "men" | "shirts" | "tank-tops" | "hoodies" | "jackets" | "polo-shirts" | "hats";

export const productTypeToCategory: Record<ProductTypes, string> = {
    'women': 'Women',
    'men': 'Men',
    'shirts': 'Shirts',
    'tank-tops': 'Tank Tops',
    'hoodies': 'Hoodies',
    'jackets': 'Jackets',
    'polo-shirts': 'Polo Shirts',
    'hats': 'Hats'
}

export const categoryToProductType = Object.fromEntries(
    Object.entries(productTypeToCategory).map(([key, value]) => [value, key])
) as Record<string, ProductTypes>
