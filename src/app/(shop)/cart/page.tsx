import { Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/cn";
import Link from "next/link";
import ProductsInCart from "./ProductsInCart";
import ProductsQuantity from "./ProductsQuantity";

export default function CartPage() {
    return (
        <div className="w-full">
            <Title>Cart ( <ProductsQuantity /> )</Title>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-8 items-start">
                <header className="w-full lg:flex-2 min-w-0 flex flex-col gap-4">
                    <ProductsInCart />
                </header>
                <footer className="w-full lg:flex-1 lg:max-w-sm min-h-35 p-2 px-10 grid place-items-center bg-white text-black rounded shadow-xl lg:sticky lg:top-8">
                    <div className="w-full">
                        <h2 className={cn("text-xl flex justify-between mb-6", titleFont.className)}>
                            <span>Total</span> <span className="font-bold">${ 405 }</span>
                        </h2>
                        <Link
                            href='/checkout/address'
                            className="btn-primary w-70"
                        >Proceed to checkout</Link>
                    </div>
                </footer>
            </div>
        </div>
    )
}
