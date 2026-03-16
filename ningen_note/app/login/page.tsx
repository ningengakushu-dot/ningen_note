"use client"
import { useState } from 'react'
import Link from "next/link"
import { login } from '@/lib/actions'
import Header from "@/components/Header"

export default function Home() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    // ※ログイン認証はSupabaseサーバーがやってくれるので、ここで比較する必要はない。
    const pushLoginData = async () => {
        const result = await login(email, password)
        if (result.error) {
            alert("IDかパスワードが間違っています")
        } else {

            alert("ログインしました")
            window.location.href = "/admin"
        }
    }
    return (
        <>
            <Header mode="login" />
            <main>
                <h1>ログイン</h1>
                <p>管理者用ページです。</p>
                <form id="login-form">
                    <div>
                        <label>メールアドレス:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>パスワード:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="button" onClick={pushLoginData}>ログイン</button>
                </form>
            </main>
        </>
    )
}
