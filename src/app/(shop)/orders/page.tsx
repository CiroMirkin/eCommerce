import { getCurrentUserOrders } from '@/actions';
import { Title } from '@/components';
import { cn } from '@/lib/cn';
import { CreditCard } from 'lucide-react';
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
                                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <CreditCard className={cn(order.isPaid ? "text-green-800" : "text-red-800")} />
                                    <span className={cn(
                                        "mx-2", 
                                        order.isPaid ? "text-green-800" : "text-red-800"
                                    )}
                                    >
                                        { order.isPaid ? "Payment": "No payment" }
                                    </span>
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
