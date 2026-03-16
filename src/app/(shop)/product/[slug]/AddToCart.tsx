"use client"

import { QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { getCartProduct, Product, Size } from "@/interfaces";
import { useState } from "react";
import { GooeyToaster, gooeyToast } from 'goey-toast'
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

interface Props {
    product: Product
}

export default function AddToCart({ product }: Props) {
    const [ size, setSize ] = useState<Size|undefined>()
    const [ quantity, setQuantity ] = useState<number>(1)
    const { cart, addProductToCart } = useCartStore()

    const handleAddToCart = () => {
        if(!size) {
            gooeyToast.error("You haven't selected a size", {
                description: 'You must select a size before adding the item to your cart.'
            })
            return
        }

        const cartItem = cart.find(item => item.id === product.id && item.size === size)
        const currentQuantity = cartItem?.quantity ?? 0
        const newProductQuantity = currentQuantity + quantity
        if (newProductQuantity > product.inStock) {
            gooeyToast.error("You already have the product stock in your cart.", {
                description: 'If you want, you can select a different size.'
            })
            return
        }

        addProductToCart(getCartProduct({ product, size, quantity }))
        gooeyToast.success("Your product was added to the product.")
    } 

    return (
        <>
            <GooeyToaster position="top-right" />

            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                handleChangeSize={setSize}
            />
            
            <div>
                <StockLabel slug={product.slug} />
                <QuantitySelector
                    quantity={quantity}
                    availableStock={product.inStock}
                    handleQuantityChange={setQuantity}
                    className="mt-2"
                />
            </div>

            <button onClick={handleAddToCart} className="btn-primary font-semibold w-60 flex justify-between items-center">
                <span className="text-base">Add to Cart</span> 
                <span className="text-lg">{ currencyFormat(product.price) }</span>
            </button>
        </>
    )
}