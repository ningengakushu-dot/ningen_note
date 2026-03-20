import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import Header from "@/components/Header"

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params  // URLから記事の名前（slug）を取得
  const post = await prisma.post.findFirst({  // 記事検索（Prismaリファレンス参照）
    where: { slug: slug, status: "published" },
  })

  // 見つからない場合
  if (post === null) {
    return (
      <>
        <Header />
        <main>
          <Link className="back-link" href="/">一覧に戻る</Link>
          <p>記事が見つかりません</p>
        </main>
      </>
    )
  }

  // 見つかった場合
  else {
    return (
      <>
        <Header />
        <main>
          <Link href="/">一覧に戻る</Link>
          <div className="detail-meta">
            {post.tags.map((tag) => (
              <span className="tag-pill" key={tag}>{tag}</span>
            ))}
            <span className="date">投稿日: {post.published_at?.toISOString().slice(0, 10)}</span>
          </div>
          <h2>{post.title}</h2>
          <div className="markdown-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </main >
      </>
    )
  }


}