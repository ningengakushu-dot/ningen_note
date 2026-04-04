import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import Header from "@/components/Header"
import type { Metadata } from 'next'


type Props = {
  params: Promise<{ slug: string }>
}

// 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findFirst({
    where: { slug, status: "published" },
  })
  if (post === null) {
    return {
    }
  }
  return {
    title: `${post.title} | 人間学習ノート`,
    description:`${post.content.slice(0,120)}`
  }
}


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
        <main className="main--narrow" >
          <Link className="back-link" href="/">← 一覧に戻る</Link>
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
        <main className="main--narrow">
          <h1 className="detail-title">{post.title}</h1>
          <div className="detail-meta">
            {post.tags.map((tag) => (
              <span className="tag-pill" key={tag}>{tag}</span>
            ))}
            <span className="date">投稿日: {post.published_at?.toISOString().slice(0, 10)}</span>
          </div>
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{post.content}</ReactMarkdown>
          </div>
        </main >
      </>
    )
  }


}