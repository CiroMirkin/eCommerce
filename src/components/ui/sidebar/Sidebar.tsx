"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useSideMenuStore } from "./stores"
import { cn } from "@/lib/cn"
import { titleFont } from "@/config/fonts"
import { ProductTypes } from "@/interfaces"

interface Props {
    categories: { 
        type: ProductTypes
        category: string
    }[]
}

export function Sidebar({ categories }: Props){
    const { isSideMenuOpen, closeSideMenu } = useSideMenuStore(state => state)

    return (
        <div>
            {isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
            )}
            
            {isSideMenuOpen && (
                <div onClick={closeSideMenu} className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm"></div>
            )}
        
            <nav className={
                cn(
                    "fixed p-5 left-0 top-0 w-125 h-screen bg-black z-20 shadow-2xl transform transition-all duration-300",
                    !isSideMenuOpen && "-translate-x-full" 
                )
            }>
                <div className="relative mt-14 text-black">
                    <Search className="absolute top-2 left-1.5" size={20}/>
                    <input 
                        type="text"
                        placeholder="search"
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-4 text-xl border-gray-200 focus:outline-none focus:border-primary-600"
                        name=""
                        id=""
                    />
                </div>
                <div className={cn("text-white py-6", titleFont.className)}>
                    <p className="text-lg mb-4">Categories</p>
                    <ul className="grid grid-cols-2 gap-2 text-base">
                        { categories.map(category => (
                            <li key={category.type}>
                                <Link onClick={closeSideMenu} href={`/category/${category.type}`} className="btn-dark flex items-center gap-3.5 text-base">
                                    {/* <Image
                                        width={35}
                                        height={35}
                                        className="rounded object-cover"
                                        src="/products/1657915-00-A_1.jpg"
                                        alt={category.category}
                                    /> */}
                                    <span>{category.category}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    )
}