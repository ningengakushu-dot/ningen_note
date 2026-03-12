import { prisma } from "@/lib/prisma"
import Link from "next/link"
import TagFilter from "@/components/TagFilter"


export default async function PostDetail({ params }: { params: { slug: string } }) {

  // URLから記事の名前（slug）を取得
  const { slug } = await params

  // Prismaから記事検索（リファレンス参照）
  const post = await prisma.post.findFirst({
    where: { slug: slug, status: "published" },
  })

  const tagList: string[] = []  // タグリストの配列と　型の指定　
  for (const post of posts) {
    tagList.push(...post.tags)
  }

  // 見つからない場合 
  if (post === null) {
    return (
      <main>
        <TagFilter tags={tagList} />
        <p>記事が見つかりません</p>
      </main>
    )
  }

  // 見つかった場合
  return (
    <main>
      <Link href="/">← 一覧に戻る</Link>
      <TagFilter tags={tagList} />
      <div id="post-grid">
        {posts.map((post) => (
          <ArticleCard key={post.id} slug={post.slug}
            title={post.title} tags={post.tags}
            published_at={post.published_at?.toISOString().slice(0, 10) ?? null}
          />
        ))}
      </div>
    </main>
  )
  /*
  【記事一覧との違い】（エラー解説）
   記事一覧（app / page.tsx）	       記事詳細（現状）
  ・記事を全件取得（findMany）        ・記事を1件取得（findFirst）
  ・posts.map() で複数カードを表示    ・post.title で1記事の中身を表示
  ・TagFilter、ArticleCard を使う    ・どちらも使わない
  */

}