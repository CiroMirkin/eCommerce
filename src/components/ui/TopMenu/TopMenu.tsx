"use client"

import { Search } from "lucide-react";
import Link from "next/link";
import { useSideMenuStore } from "../sidebar/stores";
import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/store";
import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CartIndicator } from "../CartIndicator";
import { useSession } from "next-auth/react";
import { UserMenuItem } from "./UserMenuItem";
import { Spinner } from "../Spinner";

export function TopMenu(){
    const router = useRouter()
    const openSideMenu = useSideMenuStore(state => state.openSideMenu)
    const { getTotalProductsInCart } = useCartStore()

    const { status } = useSession()
    const isLoggedIn = status === 'authenticated'
    const isLoading = status === 'loading'

    const total = useSyncExternalStore(
        useCartStore.subscribe,
        () => getTotalProductsInCart(),
        () => 0
    )
    const areThereProductsInCart = total > 0

    return (
        <nav className="w-full py-10 flex items-center justify-between">
            <ul className="flex gap-4 sm:gap-6">
                <li>
                    <button className="font-semibold hover:text-primary transition-all duration-100 ease-in" onClick={openSideMenu}>Menu</button>
                </li>
                <li>
                    <Link href='/products' className="font-semibold hover:text-primary hover:underline transition-colors duration-100 ease-in">Explore</Link>
                </li>
            </ul>
            <div className={cn(titleFont.className, "font-bold text-lg")}>
                <Link href='/'>Shop</Link>
            </div>
            <ul className="flex gap-4 sm:gap-6">
                <li>
                    <Link href='/search' className="font-semibold hover:text-primary hover:underline transition-colors duration-100 ease-in">
                        <Search className="block sm:hidden"/>
                        <span className="hidden sm:block">Search</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={areThereProductsInCart ? '/cart' : '/cart/empty'}
                        onClick={(e) => {
                            e.preventDefault()
                            router.push(areThereProductsInCart ? '/cart' : '/cart/empty')
                        }}
                        className="group font-semibold hover:text-primary hover:underline transition-colors duration-100 ease-in"
                    >
                        <CartIndicator total={total} areThereProductsInCart={areThereProductsInCart} />
                    </Link>
                </li>
                <li className="grid place-items-center">
                    {isLoading ? <Spinner/> : <UserMenuItem isLoggedIn={isLoggedIn} />}
                </li>
            </ul>
        </nav>
    )
}