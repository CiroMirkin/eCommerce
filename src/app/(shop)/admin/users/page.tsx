export const revalidate = 0

import { getUsers } from '@/actions';
import { Title } from '@/components';
import { notFound } from 'next/navigation';
import UserTable from './UserTable';
import { User } from '@/interfaces';

export default  async function  UsersPage() {
    const { users, ok } = await getUsers()

    if(!ok) notFound()

    return (
        <>
            <Title>Users</Title>
            <div className="mb-10">
                <UserTable users={users as User[]} />
            </div>
        </>
    )
}
