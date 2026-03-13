"use client"

import { cn } from "@/lib/cn"
import { useState, useCallback } from "react"

const MAX_HEIGHT = 72

interface Props {
    text: string
}

export function ExpandableText({ text }: Props) {
    const [expanded, setExpanded] = useState(false)
    const [fullHeight, setFullHeight] = useState(0)

    const contentRef = useCallback((node: HTMLParagraphElement | null) => {
        if (node) setFullHeight(node.scrollHeight)
    }, [])

    const isLong = fullHeight > MAX_HEIGHT

    return (
        <div>
            <div
                style={{ height: expanded ? fullHeight : Math.min(fullHeight, MAX_HEIGHT) }}
                className="transition-[height] duration-300 ease-in-out overflow-hidden"
            >
                <p ref={contentRef} className="text-base">{text}</p>
            </div>
            {isLong && (
                <button
                    onClick={() => setExpanded(prev => !prev)}
                    className={cn(
                        "block mt-px text-white opacity-80 hover:underline",
                        "transition-opacity duration-200"
                    )}
                >
                    { expanded ? "[ Read less ]" : "[ Read more ]" }
                </button>
            )}
        </div>
    )
}