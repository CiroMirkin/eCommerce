import { Title } from "@/components"
import { auth } from "@auth"
import { redirect } from "next/navigation"
import LogoutButton from "./LogoutButton"
import Link from "next/link"

export default async function UserPage() {
    const session = await auth()

    if(!session?.user) {
        /* redirect('/auth/login?returnTo=/user') */
        redirect('/')
    }

    return (
        <>
            <Title>Profile</Title>
            <div className="my-3">
                <Link href="/orders" className="hover:text-primary hover:underline">My orders</Link>
            </div>
            <LogoutButton />
        </>
    )
}