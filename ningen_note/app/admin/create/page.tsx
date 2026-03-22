"use client"
import { useState } from 'react'
import { useEffect } from 'react'
import { Suspense } from 'react' // ビルドエラー対策

// URLの「?」以降についているデータ（クエリパラメータ）を読み取るための機能
import { useSearchParams } from 'next/navigation'
import { createPost, getPostById, updatePost, deletePost } from "@/lib/actions"
import Link from "next/link"

function EditorForm() {
    const searchParams = useSearchParams() // URLチェック
    const id = searchParams.get('id')
    // searchParams.get('id')
    // URLの中から ?id=123 のような部分を探して、その「123」を取り出す。
    // URL　→　http://localhost:3000/admin/create?id=e5506253-e3eb-45f8-b496-ffd832137abb
    // IDの有無によって「新しい記事」か「既存の記事」かを判断する。
    //　                        ↓　↓
    // このおかげで、1つの画面を「新規作成」と「編集」の両方で使い回すことができる。
    // もし編集の場合、既存の記事データを取得し、フォームにセットする。
    useEffect(() => {
        if (id) {
            getPostById(id).then((post) => {
                if (post) {
                    setTitle(post.title)
                    setSlug(post.slug)
                    setTag(post.tags.join(', '))
                    setContent(post.content)
                    setStatus(post.status)
                    if (post.published_at) {
                        const date = new Date(post.published_at);
                        // YYYY-MM-DDTHH:mm 形式に変換
                        setPublishedAt(date.toISOString().slice(0, 16));
                    } else {
                        setPublishedAt(""); // データがなければ空文字列
                    }
                }
            })
        }
    }, [id])

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [tag, setTag] = useState("")
    const [content, setContent] = useState("")
    const [status, setStatus] = useState("draft")
    const [publishedAt, setPublishedAt] = useState<string>("")

    // 保存ボタン関数
    const pushSubmit = async () => {
        const postData = {
            title: title,
            slug: slug,
            content: content,
            status: status as 'draft' | 'published',
            tags: tag.split(',').map(t => t.trim()),
            published_at: publishedAt === "" ? null : new Date(publishedAt).toISOString(),
        }
        if (id) { // iD取得できてている場合(編集）
            await updatePost(id, postData)
        } else { // IDがない場合（新規作成）
            await createPost(postData)
        }
        alert("保存しました")
        window.location.href = "/admin"
    }

    // 削除関数
    const pushDelete = async () => {
        if (id) {
            await deletePost(id)
            alert("削除しました")
            window.location.href = "/admin"
        }
    }
    // 削除ボタンの表示（ID取得時のみ）
    let deleteButton = null
    if (id) {
        deleteButton = <button type="button" onClick={pushDelete}>削除</button>
    }

    return (
        <main>
            <h2 id="editor-title">記事の作成 / 編集</h2>
            <form id="post-form">
                <div>
                    <label>タイトル:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>スラッグ (URL文字列):</label>
                    <input type="text" placeholder="about-ningen-gakushu" value={slug} onChange={(e) => setSlug(e.target.value)} />
                </div>
                <div>
                    <label>投稿日:</label>
                    <input type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
                    <p>※未指定時は自動設定</p>
                </div>
                <div>
                    <label>タグ:</label>
                    <input type="text" placeholder="例: 技術, JavaScript" value={tag} onChange={(e) => setTag(e.target.value)} />
                </div>
                <div>
                    <label>本文 (Markdown):</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    <label>ステータス:</label>
                    <input type="radio" name="status" value="draft" checked={status === 'draft'} onChange={(e) => setStatus(e.target.value)} />下書き
                    <input type="radio" name="status" value="published" checked={status === 'published'} onChange={(e) => setStatus(e.target.value)} />公開
                </div>
                <button type="button" onClick={pushSubmit}>保存する</button>
                {deleteButton}
                <Link href="/admin">戻る</Link>
            </form>
        </main>
    )

}

export default function EditorPage() {
    return (
        <Suspense fallback={<p>読み込み中...</p>}>
            <EditorForm />
        </Suspense>
    )
}