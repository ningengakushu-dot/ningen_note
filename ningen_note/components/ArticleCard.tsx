import Link from "next/link"


type Props = {
    title: string
    slug: string
    tags: string[]
    published_at: string | null
}

export default function ArticleCard(props: Props) {
    return (
        <Link href={`/posts/${props.slug}`} className="bg-white p-5 rounded border border-gray-200 hover:border-gray-400 cursor-pointer flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
                {props.tags.map((tag) => (
                    <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600" key={tag}>{tag}</span>
                ))}
                <span className="text-xs text-gray-500">投稿日: {props.published_at}</span>
            </div>
            <h2 className="text-lg font-bold">{props.title}</h2>
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