"use client"

import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    isLoggedIn: boolean
}

export function UserMenuItem({ isLoggedIn }: Props) {
    const router = useRouter()

    return (
        <Link
            href={isLoggedIn ? '/user' : '/auth/login'}
            onClick={(e) => {
                e.preventDefault()
                router.push(isLoggedIn ? '/user' : '/auth/login')
            }}
            className="font-semibold hover:text-primary hover:underline transition-colors duration-100 ease-in"
        >
            <User className="block sm:hidden" />
            <span className="hidden sm:block">
                {isLoggedIn ? "Profile" : "Login"}
            </span>
        </Link>
    )
}