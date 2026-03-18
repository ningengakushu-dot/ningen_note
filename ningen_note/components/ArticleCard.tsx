import Link from "next/link"


type Props = {
    title: string
    slug: string
    tags: string[]
    published_at: string | null
}

export default function ArticleCard(props: Props) {
    return (
        <Link className="article-card" href={`/posts/${props.slug}`} >
            <div>
                {props.tags.map((tag) => (
                <span className="tag-pill" key={tag}>{tag}</span>
            ))}
            </div>
            <p className="card-date">投稿日：{props.published_at}</p>
            <p className="card-title">{props.title}</p>
        </Link>
    )
}




/*
カード全体を <Link href={/posts/${props.slug}}> で囲む（クリックで記事詳細へ）
投稿日は props.publishedAt を表示（YYYY-MM-DD 形式）
タイトルは props.title をそのまま表示

◆　.map リターン要らない
    {props.tags.map((tag) => (
    <span key={tag}>{tag}</span> //
    ))}

◆.map() でタグを表示する例
    {props.tags.map((tag) => (
    <span key={tag}>{tag}</span>
    ))}

◆投稿日の表示
    publishedAt は 2026-03-08T12:00:00.000Z のようなめちゃ長い'文字列'なので、
    先頭10文字だけ切り取れば YYYY-MM-DD になる：
    {props.publishedAt?.slice(0, 10) ?? "未設定"}
    ?. は「nullじゃなければ」、?? は「nullなら代わりにこっち」という意味。
*/