"use client"

import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useSyncExternalStore } from "react";

export default function OrderSummary() {
    const total = useSyncExternalStore(
        useCartStore.subscribe,
        () => useCartStore.getState().getSummaryInformation().subTotal,
        () => 0
    )

    return (
        <div className="w-full">
            <h2 className={cn("text-xl flex justify-between mb-6", titleFont.className)}>
                <span>Total</span> <span className="font-bold">{ currencyFormat(total) }</span>
            </h2>
            <Link
                href='/checkout/address'
                className="btn-primary w-70"
            >Proceed to checkout</Link>
        </div>
    )
}
