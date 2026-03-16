"use client"
import Link from "next/link"
import { logout } from "@/lib/actions"
import Header from "@/components/Header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header mode="admin" />
            {children}
        </div>
    )
}