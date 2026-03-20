import type { Metadata } from "next"
import { Inter, Noto_Sans_JP, M_PLUS_Rounded_1c } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" })
const mPlusRounded = M_PLUS_Rounded_1c({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-mplus-rounded" })


export const metadata: Metadata = {
  title: "NINGEN GAKUSHU NOTE",
  description: "個人用ブログ兼CMS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable} ${mPlusRounded.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
