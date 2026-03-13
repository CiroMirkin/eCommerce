import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/cn";
import Link from "next/link";

interface Props {
    className?: string
}

export function Footer({ className }: Props) {
    return (
        <footer className={cn("w-full flex justify-between items-center pt-4 pb-6 opacity-80 text-center text-xs font-bold", className)}>
            <div>
                <Link href='/' className="hover:text-primary hover:underline mr-6">Home</Link>
                <Link href='/products' className="hover:text-primary hover:underline">Explore</Link>
            </div>
            <p className={cn(" antialiased", titleFont.className)}>
                © eCommerce { new Date().getFullYear() }
            </p>
        </footer>
    )
}