import { Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/cn";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
    initialData.products[1],
    initialData.products[3],
    initialData.products[6],
    initialData.products[4],
]

export default function CheckoutPage() {
    return (
        <div className="w-full">
            <Title>Checkout</Title>
            <div className="flex justify-center lg:justify-between flex-wrap gap-8">
                <header className="w-full min-w-80 sm:max-w-120 flex flex-col gap-4 mt-5">
                    {productsInCart.map(product => (
                        <div key={product.slug} className="w-full flex">
                            <Image 
                                src={`/products/${product.images[0]}`}
                                width={80}
                                height={80}
                                alt={product.title}
                                className="mr-4 rounded"
                            />
                            <div className="w-full flex justify-between gap-2">
                                <div>
                                    <p className="text-base mb-1">{ product.title }</p>
                                    <p className="text-sm font-semibold mb-1">${ product.price } x 3</p>
                                    <p className="text-base font-bold">Subtotal: ${ product.price * 3 }</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </header>
                <footer className="sm:self-end w-full min-w-80 max-h-40 min-h-35 sm:max-w-125 p-5 px-10 grid place-items-center bg-white text-black rounded shadow-xl">
                    <div className="w-full">
                        <h2 className={cn("text-xl flex justify-between mb-6", titleFont.className)}>Address</h2>
                        <ul className="list-disc pl-4">
                            <li></li>
                        </ul>
                    </div>
                    <div className="w-full">
                        <h2 className={cn("text-xl flex justify-between mb-6", titleFont.className)}>
                            <span>Total</span> <span className="font-bold">${ 405 }</span>
                        </h2>
                        <Link
                            href='/orders/123'
                            className="btn-primary w-70"
                        >Order</Link>
                    </div>
                </footer>
            </div>
        </div>
    )
}