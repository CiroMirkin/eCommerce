"use client"

import { changeUserRole } from "@/actions"
import { User, UserRole } from "@/interfaces"
import { gooeyToast, GooeyToaster } from "goey-toast"

interface Props {
    users: User[]
}

export default function UserTable({ users }: Props) {

    const handleChangeUserRole = async (userId: string, newRole: UserRole) => {
        const { ok, message } = await changeUserRole(userId, newRole)
        if(!ok) gooeyToast.error(message)
        gooeyToast.success(message)
    }

    return (
        <>
            <GooeyToaster richColors />
            <table className="min-w-full rounded">
                <thead className="bg-white border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Email
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Name
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate">
                                { user.email }
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                { user.name }
                            </td>
                            <td className="px-4">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleChangeUserRole(user.id, e.target.value as UserRole)}
                                    className="w-full p-2 text-black text-sm bg-secondary"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="client">Client</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}