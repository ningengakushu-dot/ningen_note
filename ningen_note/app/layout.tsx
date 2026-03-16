import type { Metadata } from "next"
import "./globals.css"
import Footer from "@/components/Footer"
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
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">

        {children}
        <Footer />
      </body>
    </html>
  )
}