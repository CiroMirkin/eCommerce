import { titleFont } from "@/config/fonts"
import { cn } from "@/lib/cn"

interface Props {
    children: string
    className?: string
}

export function Title({ children, className }: Props) {
    return (
        <div className={cn("w-full py-6", className, titleFont.className)}>
            <h1 className="text-xl antialiased font-semibold">{ children }</h1>
        </div>
    )
}