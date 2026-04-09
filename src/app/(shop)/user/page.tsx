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
            <Title>Hi, { session.user.name }</Title>
            <div className="my-3">
                {
                    session.user.role === 'admin' 
                    ? <div className="flex gap-4 flex-wrap">
                        <Link href="/admin/orders" className="hover:text-primary hover:underline">See orders</Link>
                        <Link href="/admin/users" className="hover:text-primary hover:underline">See users</Link>
                    </div>
                    : <Link href="/orders" className="hover:text-primary hover:underline">My orders</Link>
                }
            </div>
            <LogoutButton />
        </>
    )
}