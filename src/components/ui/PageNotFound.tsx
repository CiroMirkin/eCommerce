import Link from "next/link";

interface Props {
    description?: string
}

export function PageNotFound({ description = "Explore Here, My Boy." }: Props) {
    return (
        <div className="w-full py-10 text-lg">
            <Link href='/products' className="hover:text-primary hover:underline">{ description }</Link>
        </div>
    )
}