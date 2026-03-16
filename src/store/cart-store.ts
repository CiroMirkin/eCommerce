import { CartProduct } from "@/interfaces";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[]
    addProductToCart: (product: CartProduct) => void
    getTotalProductsInCart: () => number
    getSummaryInformation: () => {
        subTotal: number,
        productsInCart: number,
    }
    updateProductQuantity: (product: CartProduct, quantity: number) => void
    removeProductFromCart: (product: CartProduct) => void
}

const cartStoreApi: StateCreator<State> = (set, get) => ({
    cart: [],
    addProductToCart: (product: CartProduct) => {
        const { cart } = get()
        const isProductInCart = cart.some(p => p.id === product.id && p.size === product.size)
        if(!isProductInCart) {
            set({ cart: [...cart, product ]})
            return
        }
        
        const updatedCart = cart.map(p => {
            if(p.id === product.id && p.size === product.size) {
                return { ...p, quantity: p.quantity + product.quantity }
            }
            return p
        })

        set({ cart: updatedCart})
    },
    getTotalProductsInCart: () => {
        const { cart } = get()
        let total = 0
        for (const product of cart) {
            total = total += product.quantity
        }
        return total
    },
    updateProductQuantity: (product: CartProduct, newQuantity: number) => {
        const { cart } = get()
        const updatedCart = cart.map(p => {
            if(p.id === product.id && p.size === product.size) {
                return { ...p, quantity: newQuantity }
            }
            return p
        })

        set({ cart: updatedCart})
    },
    removeProductFromCart: (product: CartProduct) => {
        const { cart } = get()
        const updatedCart = cart.filter(p => {
            return (p.id !== product.id || p.size !== product.size) 
        })

        set({ cart: updatedCart })
    },
    getSummaryInformation: () => {
        const { cart } = get()

        const subTotal = cart.reduce(
            (subTotal, product) => (product.quantity * product.price) + subTotal, 0
        )
        const productsInCart = cart.reduce((total, product) => total + product.quantity, 0)

        return {
            subTotal,
            productsInCart,
        }
    },
})

export const useCartStore = create<State>()(
    persist(cartStoreApi, {
        name: 'shopping-cart',
    })
)
