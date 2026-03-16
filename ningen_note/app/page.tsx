
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ArticleCard from "@/components/ArticleCard"
import TagFilter from "@/components/TagFilter"
import Header from "@/components/Header"


// データ取得 Prismaリファレンス参照（findMany、where、orderBy）
export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { published_at: "desc" },
  })
  //日付がない場合はnullを返す
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

  const postsForClient = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    tags: post.tags,
    published_at: publishedDate(post.published_at),
  }))

  return (
    <>
      <Header />
      <main>
        <div id="view-home">
          <div>
            <h1>記事一覧</h1>
          </div>

          <TagFilter tags={uniqueTags} posts={postsForClient} />

        </div>
      </main>
    </>
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