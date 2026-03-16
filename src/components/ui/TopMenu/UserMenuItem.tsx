import { auth } from "../../../../auth.config";
import { UserIcon } from "./UserIcon";

export async function UserMenuItem() {
    const session = await auth()
    const isLoggedIn = !!session?.user

    return <UserIcon isLoggedIn={isLoggedIn} />
}
