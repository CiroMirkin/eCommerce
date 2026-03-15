export const revalidate = 604800 // Aprox. 7 dias

import { getProductBySlug } from "@/actions"
import { ExpandableText, ProductSlide, QuantitySelector, SizeSelector, StockLabel } from "@/components"
import { titleFont } from "@/config/fonts"
import { cn } from "@/lib/cn"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug
    const product = await getProductBySlug(slug)
    
    return {
        title: product?.title,
        description: product.description || '',
        openGraph: {
            title: product?.title,
            description: product.description || '',
            images: [ `/products/${product?.images[1]}` ],
        }
    }
}

async function ProductBySlugPage({ params }: Props) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if(!product) notFound()

    return (
        <div className="mt-6 pb-10 px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
            <div className="col-span-1">
                <ProductSlide title={product.title} images={product.images} />
            </div>

            <div className="px-5 md:col-span-1 flex flex-col gap-6">
               <div>
                    <h1 className={cn("text-2xl antialiased font-bold", titleFont.className)}>
                        { product.title }
                    </h1>
                    <ExpandableText text={product.description} />
               </div>

                <div className="flex flex-col gap-4">
                    <SizeSelector
                        selectedSize={product.sizes[0]}
                        availableSizes={product.sizes}
                    />
                    <div>
                        <StockLabel slug={slug} />
                        <QuantitySelector quantity={1} className="mt-2" />
                    </div>
                    <button className="btn-primary font-semibold w-60 flex justify-between items-center">
                        <span className="text-base">Add to Cart</span> 
                        <span className="text-lg">${ product.price }</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductBySlugPage