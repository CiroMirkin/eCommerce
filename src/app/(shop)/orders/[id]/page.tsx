
import { getOrderById } from "@/actions";
import { Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/cn";
import { currencyFormat } from "@/utils";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function OrderByIdPage({ params }: Props) {
    const { id } = await params
    const { order, ok: orderIsOk } = await getOrderById(id)

    if (!orderIsOk) {
        notFound()
    }

    const address = order!.OrderAddress
    const products = order!.OrderItem

    return (
        <div className="w-full">
            <Title>{`Check order #${id.split('-').at(0)}`}</Title>
            <div className="flex justify-center lg:justify-between flex-wrap gap-8">
                <div className={cn(
                    "w-full flex items-center gap-2 p-2 font-semibold text-black rounded",
                    order!.isPaid ? "bg-green-300" : "bg-red-300"
                )}>
                    <CreditCard /> <span>Outstanding Payment</span>
                </div>
                <div className="w-full min-w-80 sm:max-w-120 flex flex-col gap-4">
                    {products.map(product => (
                        <div key={product.product.slug} className="w-full flex bg-dark p-2 pr-4 rounded">
                            <Image
                                src={`/products/${product.product.ProductImage[0].url}`}
                                width={80}
                                height={80}
                                alt={product.product.title}
                                className="mr-4 rounded"
                            />
                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="w-full flex justify-between items-baseline gap-4">
                                    <div>
                                        <Link href={`/product/${ product.product.slug }`} className={cn("flex-1 text-lg font-bold leading-5 mb-px hover:text-primary", titleFont.className)}>
                                            {product.product.title}
                                        </Link>
                                        <p className="text-xs">Size: <span className="font-bold">{product.size}</span></p>
                                    </div>
                                    <p className="shrink-0 py-px px-1.5 text-xs font-semibold bg-primary text-black rounded">{product.quantity}</p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-xs">Price: {currencyFormat(product.price)}</p>
                                    <p className="text-sm font-semibold">Subtotal: {currencyFormat(product.price * product.quantity)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <footer className={cn(
                    "sm:self-end w-full min-w-80 min-h-35 sm:max-w-125 p-5 px-10 grid place-items-center bg-white text-black rounded shadow-xl",
                    titleFont.className
                )}>
                    <div className="w-full">
                        <h2 className="text-xl mb-2">Address</h2>
                        <ul className="list-disc pl-4 text-sm">
                            <li>Name: {address!.firstName} {address!.lastName}</li>
                            <li>Address: {address!.address}</li>
                            <li>City: {address!.city}</li>
                            <li>Zip Code: {address!.zipCode}</li>
                            <li>Telephone: {address!.telephone}</li>
                        </ul>
                    </div>
                    <div className="w-full">
                        <h2 className="text-xl my-2">Order Summary</h2>
                        <p className={cn("text-sm flex justify-between", titleFont.className)}>
                            <span>Products</span> <span className="font-bold">
                                { products.length }
                                { products.length === 1 ? " article" : " articles"}
                            </span>
                        </p>
                        <p className={cn("text-sm flex justify-between", titleFont.className)}>
                            <span>Tax</span> <span className="font-bold">{ currencyFormat(order!.tax) }</span>
                        </p>
                        <p className={cn("text-sm flex justify-between", titleFont.className)}>
                            <span>Subtotal</span> <span className="font-bold">{ currencyFormat(order!.subTotal) }</span>
                        </p>
                        <h2 className={cn("text-xl flex justify-between mt-2", titleFont.className)}>
                            <span>Total:</span> <span className="font-bold">{ currencyFormat(order!.total) }</span>
                        </h2>
                    </div>
                </footer>
            </div>
        </div>
    )
}