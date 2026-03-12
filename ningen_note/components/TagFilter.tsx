"use client"

import Link from "next/link"

type Props = {
    tags: string[]
}

export default function TagFilter(props:Props) {
    return (
        <div>
            <button>すべて</button>
            {props.tags.map((tag) => (
                <button key={tag}>{tag}</button>
            ))}
        </div>
    )
}

