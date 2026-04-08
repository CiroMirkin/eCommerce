import { cn } from "@/lib/cn"
import { CreditCard } from "lucide-react"

interface Props {
    isPaid: boolean
    bg?: boolean
}

export function OrderStatus({ isPaid, bg = true }: Props) {
    return (
        <div className={cn(
            "w-full flex items-center gap-2 p-2 text-sm font-semibold text-black rounded whitespace-nowrap",
            isPaid ? "bg-green-400" : "bg-red-400", !bg && "bg-transparent" 
        )}>
            <CreditCard className={cn(isPaid ? "text-green-800" : "text-red-800", bg && "text-black")} />
            <span className={cn(
                "mx-2", 
                isPaid ? "text-green-800" : "text-red-800", bg && "text-black"
            )}
            >
                { isPaid ? "Payment": "No payment" }
            </span>
        </div>
    )
}
