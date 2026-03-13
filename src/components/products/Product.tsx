"use client"

import { type Product as ProductInterface } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"

interface Props {
    product: ProductInterface
}

export function Product ({ product }: Props) {
    return (
        <li className="p-2 overflow-hidden rounded fade-in transition-all duration-300 hover:bg-gray">
            <Link href={`/product/${product.slug}`} className="flex flex-col gap-2.5">
                <div className="relative w-full aspect-square group">
                    <Image 
                        src={`/products/${product.images[0]}`}
                        fill
                        className="object-cover rounded transition-opacity duration-700 ease-out group-hover:opacity-0"
                        alt={product.title}
                    />
                    <Image 
                        src={`/products/${product.images[1]}`}
                        fill
                        className="object-cover rounded transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100"
                        alt={product.title}
                    />
                </div>
                <div className="flex flex-col gap-px">
                    <p className="font-semibold text-base">{product.title}</p>
                    <p className="font-normal text-sm">$ {product.price}</p>
                </div>
            </Link>
        </li>
    )
}