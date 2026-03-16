import { Title } from "@/components";
import ProductsInCart from "./ProductsInCart";
import ProductsQuantity from "./ProductsQuantity";
import OrderSummary from "./OrderSummary";

export default function CartPage() {
    return (
        <div className="w-full">
            <Title>Cart ( <ProductsQuantity /> )</Title>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-8 items-start">
                <header className="w-full lg:flex-2 min-w-0 flex flex-col gap-4">
                    <ProductsInCart />
                </header>
                <footer className="w-full lg:flex-1 lg:max-w-sm min-h-35 p-2 px-10 grid place-items-center bg-white text-black rounded shadow-xl lg:sticky lg:top-8">
                    <OrderSummary />
                </footer>
            </div>
        </div>
    )
}
