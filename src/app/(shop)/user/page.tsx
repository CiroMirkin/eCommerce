import { Title } from "@/components"
import { auth } from "@auth"
import { redirect } from "next/navigation"
import LogoutButton from "./LogoutButton"

export default async function UserPage() {
    const session = await auth()

    if(!session?.user) {
        /* redirect('/auth/login?returnTo=/user') */
        redirect('/')
    }

    return (
        <>
            <Title>Profile</Title>
            <LogoutButton />
        </>
    )

    
}