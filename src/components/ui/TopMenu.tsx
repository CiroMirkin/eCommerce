"use client"

import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useSideMenuStore } from "./sidebar/stores";
import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/cn";

export function TopMenu(){
    const openSideMenu = useSideMenuStore(state =>  state.openSideMenu)

    return (
        <nav className="w-full py-10 flex items-center justify-between">
            <ul className="flex gap-4 sm:gap-6">
                <li>
                    <button  className="font-semibold hover:text-primary transition-all duration-100 ease-in" onClick={openSideMenu}>Menu</button>
                </li>
                <li>
                    <Link href='/products'  className="font-semibold hover:text-primary hover:underline transition-colors duration-100 ease-in">Explore</Link>
                </li>
            </ul>
            <div className={cn(titleFont.className, "font-bold text-lg")}>
                <Link href='/'>
                    Shop
                </Link>
            </div>

            <ul className="flex gap-4 sm:gap-6">
                <li>
                    <Link href='/search' className="font-semibold hover:text-primary hover:underline transition-colors duration-100 ease-in">
                        <Search className="block sm:hidden"/>
                        <span className="hidden sm:block">Search</span>
                    </Link>
                </li>
                <li>
                    <Link href='/cart' className="font-semibold hover:text-primary hover:underline transition-colors duration-100 ease-in">
                        <div className="relative block sm:hidden">
                            <span className="absolute px-1 text-xs rounded-full font-bold -top-2 -right-2 bg-black text-white"></span>
                            <ShoppingCart className=""/>
                        </div>
                        <span className="hidden sm:block">Cart</span>
                    </Link>
                </li>
                <li>
                    <Link href='/user' className="font-semibold hover:text-primary hover:underline transition-colors duration-100 ease-in">
                        <div className="relative block sm:hidden">
                            <span className="absolute px-1 text-xs rounded-full font-bold -top-2 -right-2 bg-black text-white"></span>
                            <User className=""/>
                        </div>
                        <span className="hidden sm:block">Profile</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}