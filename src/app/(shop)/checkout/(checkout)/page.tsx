import { Title } from "@/components";
import Link from "next/link";
import ProductsInCheckout from "./ProductsInCheckout";
import PlaceOrder from "./PlaceOrder";

export default function CheckoutPage() {
    
    return (
        <div className="w-full">
            <Title>Checkout</Title>
            <div className="flex justify-center lg:justify-between flex-wrap gap-8">
                <header className="w-full min-w-80 sm:max-w-120 flex flex-col gap-2">
                    <ProductsInCheckout/>
                    <Link href={'/cart'} className="text-sm hover:underline pl-1">Edit cart</Link>
                </header>
                <footer className="w-full min-w-80 min-h-35 sm:max-w-125 p-5 px-10 grid place-items-center bg-white text-black rounded shadow-xl">
                    <PlaceOrder />
                </footer>
            </div>
        </div>
    )
}