
export interface Product {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    type: ProductTypes;
    gender: 'men'|'women'|'unisex'
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ProductTypes = 'shirts'|'pants'|'hoodies'|'hats';
