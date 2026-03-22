import { ProductToOrder } from "@/interfaces"

interface OrderCalculation {
    itemsInOrder: number
    subTotal: number
    tax: number
    total: number
}

interface Product {
    id: string
    price: number
}

/** Returns item count, subtotal, tax, and total for an order. */
export const calculateOrderTotals = (productsToOrder: ProductToOrder[], products: Product[]): OrderCalculation => {
    const itemsInOrder = productsToOrder.reduce((count, p) => count + p.quantity, 0)

    const { subTotal, tax, total } = productsToOrder.reduce((totals, item) => {
        const productQuantity = item.quantity
        const product = products.find(p => p.id === item.productId)

        if (!product) throw new Error(`Product ${item.productId} do not exists - Error 500`)

        const subTotal = product.price * productQuantity
        totals.subTotal += subTotal
        totals.tax += subTotal * 0.15
        totals.total += subTotal * 1.15

        return totals
    }, { subTotal: 0, tax: 0, total: 0 })

    return { itemsInOrder, subTotal, tax, total }
}
