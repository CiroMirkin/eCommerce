"use client"
import { cn } from "@/lib/cn"
import { Minus, Plus } from "lucide-react"

interface Props {
    quantity: number
    className?: string
    availableStock?: number
    
    handleQuantityChange: (quantity: number) => void
}

export function QuantitySelector({ quantity, className, availableStock, handleQuantityChange }: Props) {
    const buttonClassName = "border border-mist-800 hover:border-mist-600 transition-border duration-500 rounded px-2.5"
    
    const handleQuantityChanged = (value: number) => {
        const newQuantity = quantity + value
        if(newQuantity < 1) return
        if(availableStock && newQuantity > availableStock) return
        handleQuantityChange(newQuantity)
    }

    return (
        <div className={cn("flex gap-1", className)}>
            <button className={buttonClassName} onClick={() => handleQuantityChanged(-1)}>
                <Minus size={10} />
            </button>
            <span className="w-10 py-1 text-center text-base cursor-default select-none">{ quantity }</span>
            <button className={buttonClassName} onClick={() => handleQuantityChanged(+1)}>
                <Plus size={10} />
            </button>
        </div>
    )
}