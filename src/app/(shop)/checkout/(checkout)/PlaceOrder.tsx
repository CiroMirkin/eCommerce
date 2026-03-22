"use client"

import { Spinner } from "@/components"
import { titleFont } from "@/config/fonts"
import { cn } from "@/lib/cn"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { useState } from "react"

export default function PlaceOrder() {
    const [ isPlacingOrder, setIsPlacingOrder ] = useState(false)
    const { address } = useAddressStore()
    const { getTotalProductsInCart, getSummaryInformation, cart } = useCartStore()
    const productsInTheOrder = getSummaryInformation().productsInCart
    const total = getTotalProductsInCart()

    /*  href='/orders/123' */
    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true)
        
        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }))

        console.log(productsToOrder)
    }

    return (
        <>
            <div className="w-full">
                <h2 className={cn("text-xl mb-2", titleFont.className)}>Address</h2>
                <ul className="list-disc pl-4">
                    <li>Name: {address.firstName} {address.lastName}</li>
                    <li>Address: {address.address}</li>
                    <li>City: {address.city}</li>
                    <li>Country: {address.country}</li>
                    <li>Zip Code: {address.zipCode}</li>
                    <li>Telephone: {address.telephone}</li>
                </ul>
            </div>

            <div className={cn("w-full", titleFont.className)}>
                <p className="flex justify-between">Product No. <span>{ productsInTheOrder }</span></p>
                <h2 className="text-xl flex justify-between mb-6">
                    <span>Total:</span> <span className="font-bold">{ currencyFormat(total) }</span>
                </h2>

                <button
                    className={cn(
                        "w-full flex items-center justify-center gap-2 btn-primary text-center leading-3 py-3",
                        isPlacingOrder && "btn-disabled"
                    )}
                    onClick={() => handlePlaceOrder()}
                >
                    { isPlacingOrder && <Spinner/> }
                    { isPlacingOrder ? "Ordering..." : "Order"}
                </button>
            </div>
        </>
    )
}