"use client"
import Link from "next/link"
import { logout } from "@/lib/actions"

export default function Header({ mode = "public" }: { mode?: "public" | "admin" | "login" }) {
    const pushLogout = async () => {
        await logout()
        window.location.href = "/login"
    }
    let navLinks;
    if (mode === "admin") {
        navLinks =
            <>
                <Link href="/" target="_blank">公開サイトを確認</Link><button onClick={pushLogout}>ログアウト</button>
            </>
    } else if (mode === "login") {
        navLinks = <Link href="/" target="_blank">公開サイトを確認</Link>
    } else {
        navLinks = <Link href="/login">管理者ログイン</Link>
    }

    return (
        <header>
            <div>
                <Link href="/" className="logo" >NINGEN GAKUSHU NOTE</Link>
                <nav>{navLinks}</nav>

            </div>
        </header>
    )
}