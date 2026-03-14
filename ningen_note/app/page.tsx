import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ArticleCard from "@/components/ArticleCard"
import TagFilter from "@/components/TagFilter"


// データ取得
// Prismaのリファレンスを参照（findMany、where、orderBy）
export default async function Home() {
  const posts = await prisma.post.findMany({   // 記事を取得
    where: { status: "published" },
    orderBy: { published_at: "desc" },
  })

  //日付がない場合は null を返す
  function publishedDate(dateString: Date | null) {
    if (dateString) {
      return dateString.toISOString().slice(0, 10);
    } else {
      return null;
    }
  }

  const tagList: string[] = []
  for (const post of posts) {
    tagList.push(...post.tags)
  }

  const uniqueTags = Array.from(new Set(tagList))

  return (
    <main>
      <div id="view-home">
        <div>
          <h1>記事一覧</h1>
        </div>
        <TagFilter tags={uniqueTags} />
        <div id="post-grid">
          {posts.map((post) => (
            <ArticleCard key={post.id} slug={post.slug}
              title={post.title} tags={post.tags}
              published_at={publishedDate(post.published_at)}
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