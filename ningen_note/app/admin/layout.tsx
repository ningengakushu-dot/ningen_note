import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav>
                <Link href="/admin">記事一覧</Link>
                <Link href="/admin/create">新規作成</Link>
                <button>ログアウト</button>
            </nav>
            {children}
        </div>
    )
}