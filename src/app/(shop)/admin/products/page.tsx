import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    searchParams: Promise<{
        page?: string
    }>
}

export default  async function  AdminProductsPage({ searchParams }: Props) {
    const pageParam = (await searchParams).page
    const page = pageParam ? parseInt(pageParam) : 1
    const { products, totalPages } = await getPaginatedProductsWithImages({ page })

    return (
        <>
            <Title>Products</Title>

            <div className="flex justify-end mb-5">
                <Link href="/admin/product/new" className="btn-primary">New Product</Link>
            </div>

            <div className="mb-10">
                <table className="min-w-full rounded">
                    <thead className="bg-white border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-dark px-6 py-4 text-left">
                                Image
                            </th>
                            <th scope="col" className="text-sm font-medium text-dark px-6 py-4 text-left">
                                Title
                            </th>
                            <th scope="col" className="text-sm font-medium text-dark px-6 py-4 text-left">
                                Price
                            </th>
                            <th scope="col" className="text-sm font-medium text-dark px-6 py-4 text-left">
                                Stock
                            </th>
                            <th scope="col" className="text-sm font-medium text-dark px-6 py-4 text-left">
                                Sizes
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="bg-white border-b text-black">
                                <td>
                                    <Link href={`/products/${product.slug}`}>
                                        <Image
                                            src={`/products/${product.images[0]}`}
                                            width={70}
                                            height={70}
                                            alt={product.title}
                                            className="mr-2 object-cover"
                                        />
                                    </Link>
                                </td>
                                <td className="text-base px-6 py-2 whitespace-nowrap">
                                    <Link href={`/admin/product/${ product.slug }`} className="hover:underline">
                                        { product.title }
                                    </Link>
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 truncate">
                                    { currencyFormat(product.price) }
                                </td>
                                <td className='text-center'>
                                    { product.inStock }
                                </td>
                                <td>
                                    { product.sizes.join(' - ') }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination totalPages={totalPages} />
            </div>
        </>
    )
}
