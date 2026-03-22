"use client"

import { titleFont } from "@/config/fonts"
import { cn } from "@/lib/cn"
import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import Image from "next/image"
import { useSyncExternalStore } from "react"

export default function ProductsInCheckout() {
    const { cart } = useCartStore()
    const productsInCart = useSyncExternalStore(
        useCartStore.subscribe,
        () => cart,
        () => []
    )

    return (
        <>{ productsInCart.map(product => (
            <div key={`${product.slug} - ${product.size}`} className="w-full flex bg-dark p-2 pr-4 rounded">
                <Image
                    src={`/products/${product.image}`}
                    width={90}
                    height={80}
                    alt={product.title}
                    className="mr-4 rounded"
                />
                <div className="flex-1">
                    <div className="flex flex-col justify-between gap-2">
                        <div className="w-full flex justify-between items-baseline gap-4">
                            <div>
                                <p className={cn("flex-1 text-lg font-bold leading-5 mb-px", titleFont.className)}>
                                    { product.title }
                                </p>
                                <p className="text-xs">Size: <span className="font-bold">{ product.size }</span></p>
                            </div>
                            <p className="shrink-0 py-px px-1.5 text-xs font-semibold bg-primary text-black rounded">{ product.quantity }</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-xs">Price: { currencyFormat(product.price) }</p>
                            <p className="text-sm font-semibold">Subtotal: { currencyFormat(product.price * product.quantity) }</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}</>
    )
} 