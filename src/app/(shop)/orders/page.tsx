import { getCurrentUserOrders } from '@/actions';
import { OrderStatus, Title } from '@/components';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default  async function  OrdersPage() {
    const { orders, ok } = await getCurrentUserOrders()

    if(!orders || !ok) notFound()

    return (
        <>
            <Title>Orders</Title>
            <div className="mb-10">
                <table className="min-w-full rounded">
                    <thead className="bg-white border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Name
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                State
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="bg-white border-b">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate">{ order.id}</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    { order.OrderAddress!.firstName }
                                </td>
                                <td>
                                    <OrderStatus isPaid={order.isPaid} bg={false} />
                                </td>
                                <td className="text-sm text-dark px-6 ">
                                    <Link href={`/orders/${order.id}`} className="hover:underline">
                                        See order
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
