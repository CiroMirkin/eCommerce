"use client"
import { cn } from "@/lib/cn"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

interface Props {
    quantity: number
    className?: string
}

export function QuantitySelector({ quantity, className }: Props) {
    const [ count, setCount ] = useState(quantity)
    const buttonClassName = "border border-mist-800 hover:border-mist-600 transition-border duration-500 rounded px-2.5"
    
    const handleQuantityChanged = (value: number) => {
        if((count + value) < 1) return
        setCount(count + value)
    }

    return (
        <div className={cn("flex gap-1", className)}>
            <button className={buttonClassName} onClick={() => handleQuantityChanged(-1)}>
                <Minus size={10} />
            </button>
            <span className="w-10 py-1 text-center text-base cursor-default select-none">{ count }</span>
            <button className={buttonClassName} onClick={() => handleQuantityChanged(+1)}>
                <Plus size={10} />
            </button>
        </div>
    )
}