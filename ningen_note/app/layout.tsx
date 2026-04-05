import type { Metadata } from "next"
import { Inter, Noto_Sans_JP, M_PLUS_Rounded_1c } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" })
const mPlusRounded = M_PLUS_Rounded_1c({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-mplus-rounded", adjustFontFallback: false })


export const metadata: Metadata = {
  title: "プログラミングとWeb開発の実践記録 | 人間学習ノート",
  description: "プログラミングの学習やWeb開発で得た知見を記録する技術ブログ。技術選定や設計の意図から実装の詳細まで、開発の過程をドキュメントとして公開しています。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      {/* GAトラッキングコード */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-0PNW8YF93Y" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || []
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date())
        gtag('config', 'G-0PNW8YF93Y')
        `}
      </Script>

      <body className={`${inter.variable} ${notoSansJP.variable} ${mPlusRounded.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
