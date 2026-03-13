import { titleFont } from "@/config/fonts";
import type { Size } from "@/interfaces";
import { cn } from "@/lib/cn";

interface Props {
    selectedSize: Size
    availableSizes: Size[]
}

export function SizeSelector({ selectedSize, availableSizes }: Props) {
    return (
        <div>
            <h3 className={cn("font-bold text-base mb-3", titleFont.className)}>Select size</h3>

            <div className="grid grid-cols-2 gap-1.5">
                {availableSizes.map(size => (
                    <button
                        key={size}
                        className={cn(
                            "btn-dark text-lg text-left",
                            size === selectedSize && "bg-white text-black" 
                        )}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    )
}