"use client" //*

import { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createPost, getPostById, updatePost } from "@/lib/actions"
import Link from "next/link"


export default function Editor() {

    const searchParams = useSearchParams() // URLチェック
    const id = searchParams.get('id') //URLのid=xxxからIDを取得
    useEffect(() => {
        // もしIDがあれば（編集モードなら）データを取得
        if (id) {
            getPostById(id).then((post) => {
                if (post) {
                    // 取ってきたデータをそれぞれの箱（State）に入れる
                    setTitle(post.title)
                    setSlug(post.slug)
                    setTag(post.tags.join(', '))
                    setContent(post.content)
                    setStatus(post.status)
                }
            })
        }
    }, [id]) // IDが変わった時に実行する

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [tag, setTag] = useState("")
    const [content, setContent] = useState("")
    const [status, setStatus] = useState("draft")

    const handleSubmit = async () => {
        const postData = {
            title: title,
            slug: slug,
            content: content,
            status: status as 'draft' | 'published',
            tags: tag.split(',').map(t => t.trim()),
        }
        if (id) {
            await updatePost(id, postData)
        } else {
            await createPost(postData)
        }

        alert("保存しました")
        window.location.href = "/admin"
    }

    return (
        <main>
            <h2 id="editor-title">記事の作成 / 編集</h2>
            <form id="post-form">
                <div>
                    <label>タイトル:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>スラッグ (URL文字列):</label>
                    <input type="text" placeholder="about-Ningen" value={slug} onChange={(e) => setSlug(e.target.value)} />
                </div>
                <div>
                    <label>投稿日:</label>
                    <input type="datetime-local" />
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
                <button type="button" onClick={handleSubmit}>保存する</button>
                <Link href="/admin">戻る</Link>
            </form>
        </main>
    )
}
