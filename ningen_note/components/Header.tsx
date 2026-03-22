"use client"
import Link from "next/link"
import { logout } from "@/lib/actions"
import { useState, useEffect } from "react" //スクロール検知用
import { usePathname } from "next/navigation"


export default function Header({ mode = "public" }: { mode?: "public" | "admin" | "login" }) {
    const pathname = usePathname()

    // スクロール時にロゴが変化
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])


    const pushLogout = async () => {
        await logout()
        window.location.href = "/login"
    }
    let navLinks;
    if (mode === "admin") {
        navLinks =
            <>
                <button onClick={pushLogout} className="nav-link nav-link--muted" >ログアウト</button>
                <Link href="/" target="_blank" className="btn-preview" >公開サイトを確認</Link>
            </>
    } else if (mode === "login") {
        navLinks = null
    } else {
        navLinks =
            <>
                <Link href="/admin" className="nav-link nav-link--muted">管理画面</Link>
                <Link href="/" className={`nav-btn ${pathname === "/" ? "active" : ""}`}>ノート一覧</Link>
            </>
    }

    return (
        <header className={scrolled ? "scrolled" : ""}>
            <div>
                <Link href="https://ningengakushu.com/" className="logo" >人間<span>学習</span></Link>
                <nav className="nav-desktop">{navLinks}</nav>
            </div>
        </header>
    )
}