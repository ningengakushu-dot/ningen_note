import {prisma} from "@/lib/prisma"
import Link from "next/link"


// データ取得
export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { published_at: "desc" },
  })
  return(
    <main>
  <div id="view-home">
    <div>
      <h1>記事一覧</h1>
    </div>
    <div id="post-grid">
      
    </div>
  </div>
</main>
  )
}


// 関数を async にする
// findMany で記事を取得する（条件はまだ空でもOK）
// return の中に <main> と <h1>記事一覧</h1> だけ置く