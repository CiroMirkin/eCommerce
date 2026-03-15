"use client"

import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useSyncExternalStore } from "react"

export default function ProductsInCart() {
    const { updateProductQuantity, removeProductFromCart } = useCartStore()
    const productsInCart = useSyncExternalStore(
        useCartStore.subscribe,
        () => useCartStore.getState().cart,
        () => []
    )

    return (
        <>{ productsInCart.map(product => (
            <div key={`${product.slug} - ${product.size}`} className="w-full flex bg-dark p-2 pr-4 rounded">
                <Image
                    src={`/products/${product.image}`}
                    width={80}
                    height={80}
                    alt={product.title}
                    className="mr-4 rounded"
                />
                <div className="w-full flex justify-between gap-2">
                    <div className="flex flex-col justify-between">
                        <div>
                            <Link 
                                href={`/product/${ product.slug }`}
                                className="text-base font-bold mb-1 hover:underline transition-all duration-300"
                            >
                                { product.title }
                            </Link>
                            <p className="text-sm font-semibold">${ product.price }</p>
                        </div>
                        <p className="text-xs font-semibold">Size: { product.size }</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <QuantitySelector
                            quantity={product.quantity}
                            handleQuantityChange={(quantity: number) => updateProductQuantity(product, quantity)}
                        />
                        <button
                            onClick={() => removeProductFromCart(product)}
                            className="text-sm py-1 px-2 border border-black rounded hover:border-mist-600 hover:bg-dark transition-colors duration-500"
                        >
                                Remove
                        </button>
                    </div>
                </div>
            </div>
        ))}</>
    )
} 