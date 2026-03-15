import { titleFont } from "@/config/fonts"
import { cn } from "@/lib/cn"
import { ReactNode } from "react"

interface Props {
    children: string | ReactNode
    className?: string
}

export function Title({ children, className }: Props) {
    return (
        <div className={cn("w-full py-6", className, titleFont.className)}>
            <h1 className="text-xl antialiased font-semibold">{ children }</h1>
        </div>
    )
}