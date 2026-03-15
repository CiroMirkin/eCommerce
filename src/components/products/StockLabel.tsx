"use client"

import { getProductStockBySlug } from "@/actions"
import { titleFont } from "@/config/fonts"
import { cn } from "@/lib/cn"
import { useEffect, useState } from "react"
import { Spinner } from "../ui/Spinner"

interface Props {
    slug: string
}

export function StockLabel({ slug }: Props) {
    const [stock, setStock] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getStock = async () => {
            const { stock: updatedStock } = await getProductStockBySlug(slug)
            setStock(updatedStock)
            setIsLoading(false)
        }

        getStock()
    }, [slug])

    return (
        <h2 className={cn("font-semibold text-base flex gap-2 items-center", titleFont.className)}>
            Stock: { isLoading ? <Spinner /> : stock }
        </h2>
    )
}
