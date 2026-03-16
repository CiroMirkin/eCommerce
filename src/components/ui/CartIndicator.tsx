import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
    total: number
    areThereProductsInCart: boolean
}

export function CartIndicator({ total, areThereProductsInCart }: Props) {
    const showBadge = total < 10
    return (
        <>
            <div className="relative block sm:hidden">
                { areThereProductsInCart && (
                    <span className={cn(
                        "absolute py-px px-[2.5px] text-xs rounded-full font-bold -top-1 -right-2.5 bg-black text-white group-hover:bg-primary group-hover:text-black transition-colors",
                        showBadge ? "px-1.5" : "px-[2.5px]",
                    )}>{ total }</span>
                )}
                <ShoppingCart />
            </div>
            <div className="relative hidden sm:block">
                { areThereProductsInCart && (
                    <span className={cn(
                        "absolute py-px px-[2.5px] text-xs rounded-full font-bold -top-2 -right-3.5 bg-white group-hover:bg-primary text-black transition-colors",
                        showBadge ? "px-1.5" : "px-[2.5px]",
                    )}>{ total }</span>
                )}
                <span>Cart</span>
            </div>
        </>
    )
}