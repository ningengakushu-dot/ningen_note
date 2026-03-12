"use client"

import Link from "next/link"

type Props = {
    tags: string[]
}

export default function TagFilter(props: Props) {
    return (
        <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-gray-900 text-white">すべて</button>
            {props.tags.map((tag) => (
                <button className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200" key={tag}>{tag}</button>
            ))}
        </div>
    )
}