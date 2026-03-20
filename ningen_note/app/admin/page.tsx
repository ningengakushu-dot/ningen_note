import { getAllPosts } from "@/lib/actions"
import Link from "next/link"
/*
1. 非同期コンポーネントの定義
    actionsの（getAllPosts）を使ってデータを取得するため、
    画面自体を非同期で動かす（async default function）
*/
export default async function Home() {
    const posts = await getAllPosts()

    // ステータスが公開か、下書きか
    function statusName(status: string) {
        if (status === 'published') {
            return '公開中'
        } else {
            return '下書き'
        }
    }

    // 日付データがnullなら'未設定'を返す
    function formatDate(dateString: Date | null) {
        if (dateString) {
            return new Date(dateString).toLocaleDateString()
        } else {
            return '未設定'
        }
    }

    // 記事がない場合
    if (posts.length === 0) {
        return (
            <main>
                <h2>記事一覧</h2>
                <Link href="/admin/create">+ 新規記事を作成</Link>
                <p>記事がありません</p>
            </main>
        )
    } else {
        return (
            <main>
                <div className="admin-header">
                    <h2>記事一覧</h2>
                    <Link href="/admin/create" className="btn-yellow">+ 新規作成</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>タイトル</th>
                            <th>タグ</th>
                            <th>投稿日</th>
                            <th>ステータス</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="data-table">
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.tags.join(", ")}</td>
                                <td>{formatDate(post.published_at)}</td>
                                <td>{statusName(post.status)}</td>
                                <td><Link href={`/admin/create?id=${post.id}`}>編集</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        )
    }
}
/*
2. データの取得 関数の中で await getAllPosts() を実行し、
    結果を変数（例：posts）に格納します。

3. HTML（JSX）の返却 return でHTML構造を返します。
    取得した posts という配列の中にデータがあれば表で表示し、
    なければ「記事がありません」と切り替える処理を書きます。

まずは app/admin/page.tsxを作成し、
枠組み（インポート文とコンポーネント名の定義）だけ
書いた状態から始めてみてください。

*/