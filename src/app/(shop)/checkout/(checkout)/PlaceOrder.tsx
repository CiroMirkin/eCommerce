"use client"

import { placeOrder } from "@/actions"
import { Spinner } from "@/components"
import { titleFont } from "@/config/fonts"
import { cn } from "@/lib/cn"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { gooeyToast, GooeyToaster } from "goey-toast"
import { notFound, useRouter } from "next/navigation"
import { useState } from "react"

export default function PlaceOrder() {
    const router = useRouter()
    
    const [ isPlacingOrder, setIsPlacingOrder ] = useState(false)
    
    const { address } = useAddressStore()
    const { getSummaryInformation, cart, clearCart } = useCartStore()
    const productsInTheOrder = getSummaryInformation().productsInCart
    const total =  getSummaryInformation().subTotal

    if(!productsInTheOrder && !isPlacingOrder) notFound()

    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true)
    
        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }))

        const response = await placeOrder(productsToOrder, {
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            city: address.city,
            zipCode: address.zipCode,
            telephone: address.telephone,
            secondAddress: address.secondAddress,
            country: address.country,
        })

        if(!response.ok) {
            setIsPlacingOrder(false)
            gooeyToast.error(response.message)
            return
        }
        gooeyToast.success(response.message)
        
        clearCart()
        router.replace('/orders/'+response.order!.id)
    }

    return (
        <>
        <GooeyToaster position="top-right" />
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