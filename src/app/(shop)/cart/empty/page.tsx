import Link from "next/link";

export default function EmptyCartPage() {
    return (
        <div className="w-full h-90 grid place-items-center">
            <div className="text-center">
                <p className="text-xl font-semibold">Your cart is still empty</p>
                <Link href='/products' className="text-primary text-lg hover:underline transition-all duration-300" >Go explore</Link>
            </div>
        </div>
    )
}
