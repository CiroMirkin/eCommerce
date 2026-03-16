"use client"

import { useCartStore } from "@/store"
import { useSyncExternalStore } from "react"

export default function ProductsQuantity() {
    const { getTotalProductsInCart } = useCartStore()
    const total = useSyncExternalStore(
        useCartStore.subscribe,
        () => getTotalProductsInCart(),
        () => 0
    )
    
    return (
        <> { total } </>
    )
}
