"use client"

import { cn } from "@/lib/cn"
import { generatePaginationNumbers } from "@/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

interface Props {
    totalPages: number
}

export function Pagination({ totalPages }: Props) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams)
        const pageNumber = Number(page)

        if(pageNumber <= 1) {
            const url = `${pathname}`
            return url
        }

        if(pageNumber > totalPages) {            
            const url = `${pathname}?${params.toString()}`
            return url
        }

        params.set('page', pageNumber.toString())
        const url = `${pathname}?${params.toString()}`
        return url
    }

    const getPageNumber = (page: string | number, paginationIndex: number): number => {
        // Cuando page es '...' se navega al punto medio entre la pagina anterior y la siguiente.
        return page === '...' 
            ? Math.round((Number(pagination[paginationIndex-1]) + Number(pagination[paginationIndex+1])) / 2) 
            : Number(page)
    }

    const pagination = generatePaginationNumbers(currentPage, totalPages)
    return (
        <div className="flex justify-center mt-12">
            <nav className="flex gap-2">
                <Link
                    className={cn(
                        "page-link btn-dark relative block py-1.5 px-3 rounded outline-none focus:shadow-none", 
                        currentPage <= 1 && "pointer-events-none opacity-50",
                    )}
                    href={ createPageUrl(currentPage-1) }
                    aria-disabled={currentPage <= 1 && "true"}
                >
                    <ChevronLeft/>
                </Link>

                <ul className="flex list-style-none gap-1.5">
                    {pagination.map((page, i) => (
                        <li key={page} className="page-item">
                            <a
                                className={cn(
                                    "page-link relative block py-1.5 px-4 outline-none focus:shadow-none",
                                    page === currentPage ? "btn-primary" : "btn-dark",
                                )}
                                href={ createPageUrl(getPageNumber(page, i)) }
                            >
                                { page }
                            </a>
                        </li>
                    ))}
                </ul>

                <Link
                    className={cn(
                        "page-link btn-dark relative block py-1.5 px-3 rounded outline-none focus:shadow-none", 
                        currentPage === totalPages && "pointer-events-none opacity-50",

                    )}
                    href={ createPageUrl(currentPage+1) }
                    aria-disabled={currentPage === totalPages && "true"}
                >
                    <ChevronRight/>
                </Link>
            </nav>
        </div>
    )
}