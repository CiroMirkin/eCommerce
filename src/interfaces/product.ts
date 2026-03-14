
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
    type?: ProductTypes;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';

export type ProductTypes = "women" | "men" | "shirts" | "tank-tops" | "hoodies" | "jackets" | "polo-shirts" | "hats";
