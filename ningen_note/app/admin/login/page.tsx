import Link from "next/link"

export default async function Home() {
    return (
        <main>
            <h1>ログイン</h1>
            <p>管理者用ページです。</p>

            <form id="login-form">
                <div>
                    <label>メールアドレス:</label>
                    <input type="email" id="email" />
                </div>
                <div>
                    <label>パスワード:</label>
                    <input type="password" id="password" />
                </div>
                <button type="button">ログイン</button>
            </form>
        </main>
    )
}
