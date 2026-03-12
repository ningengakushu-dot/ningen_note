import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ArticleCard from "@/components/ArticleCard"
import TagFilter from "@/components/TagFilter"


// データ取得
export default async function Home() {            // async追加
  const posts = await prisma.post.findMany({      // findMany 記事を取得
    where: { status: "published" },
    orderBy: { published_at: "desc" },
  })

  return (
    <main className="grow max-w-4xl mx-auto px-4 py-8">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
        </div>

        {/* <TagFilter />　後日 */}

        <div className="grid gap-6">
          {posts.map((post) => (
              <ArticleCard key={post.id} slug={post.slug}
                title={post.title} tags={post.tags}
                published_at={post.published_at?.toISOString().slice(0, 10) ?? null}
              />
          ))}
        </div>
      </div>
    </main>
  )
}

/*
おさらい
1. JSXの中でJSを書くときは {} で囲む
  <p>{props.title}</p>

2. 配列を表示するには .map()

3. 悩み過ぎない（Date ≠ string）
    ?. や ?? や .toISOString() 　は使うたびに調べればOK。

※リンク繋がらない
<Link href={`/posts/${slug}`}> 
*/