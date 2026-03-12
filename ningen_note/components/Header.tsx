import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">NINGEN GAKUSHU NOTE</Link>
                <Link href="/admin/login" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">管理者ログイン</Link>
            </div>
        </header>
    )
}