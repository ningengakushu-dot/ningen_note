import Link from "next/link"

export default function Header() {
    return (
        <header>
            <div>
                <Link href="/">NINGEN GAKUSHU NOTE</Link>
                <Link href="/admin/login">管理者ログイン</Link>
            </div>
        </header>
    )
}