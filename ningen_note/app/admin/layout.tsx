"use client"
import Link from "next/link"
import { logout } from "@/lib/actions"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pushLogout = async () => {
        await logout()
        window.location.href = "/login"
    }
    return (
        <div>
            <nav>
                <Link href="/admin">記事一覧</Link>
                <Link href="/admin/create">新規作成</Link>
                <button onClick={pushLogout}>ログアウト</button>
            </nav>
            {children}
        </div>
    )
}