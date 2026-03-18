"use client"
import { useState } from "react"
import ArticleCard from "@/components/ArticleCard"

type Props = {
    tags: string[]
    posts: { // 
        id: string
        title: string
        slug: string
        tags: string[]
        published_at: string | null
    }[]
}

export default function TagFilter(props: Props) {
    // const [現在の変数, 変数を変えるための関数] = useState <型> (初期値)   
    const [selectTag, setSelectTag] = useState<string | null>(null)

    let filterPosts

    if (selectTag === null) {
        filterPosts = props.posts
    } else {
        filterPosts = props.posts.filter((post) => post.tags.includes(selectTag))
        // filter：条件一致するものを抽出。　includes：指定の値が含まれてるか確認
    }
    return (
        <>
            <div className="tag-filters">
                {/* テンプレリテラル（tag-btn） */}
                <button className={`tag-btn ${selectTag === null? "active" : ""}`} onClick={() =>
                    setSelectTag(null)}>すべて</button>
                {props.tags.map((tag) => (
                    <button className="tag-btn" key={tag} onClick={() =>
                        setSelectTag(tag)}>{tag}</button>
                ))}
            </div>
            <div className="post-grid">
                {filterPosts.map((post) => (
                    <ArticleCard key={post.id} slug={post.slug}
                        title={post.title} tags={post.tags}
                        published_at={post.published_at} />
                ))}
            </div >
        </>
    )
}

/*
--- 内容 ---
ステップ1: 「技術」ボタンの onClick が動く → setSelectTag("技術")
ステップ2: selectTag の中身が "技術" になる
ステップ3: Reactがこの関数を最初から再実行する
ステップ4: if文で selectTag === null をチェック
　　　　　　　→ "技術" なので false → else に進む
ステップ5: filterPosts に「技術」タグを持つ記事だけ入る
ステップ6: return で filterPosts の記事だけ画面に表示される

「すべて」ボタンを押したときは、ステップ2で null に戻るので、ステップ4で true → 全記事が入る。

1. ユーザー操作（クリックなど）を扱うにはClient Componentにする必要があるので "use client"
useStateについて
const [現在の変数, 変数を変えるための関数] = useState <型> (初期値)   

2. 「すべて」ボタン
<button onClick={() => setSelectTag(null)}>すべて</button>
    クリック → 箱の中身が null になる（＝全部表示

3. 「各タグ」ボタン
<button onClick={() => setSelectTag(tag)}>
    「技術」ボタンをクリック → 箱の中身が"技術"になる
    「日常」ボタンをクリック → 箱の中身が"日常"になる
*/