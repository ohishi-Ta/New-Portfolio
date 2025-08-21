// src/app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_JP, Figtree } from 'next/font/google'
import "./globals.scss";
import "../styles/home.scss";
import "../styles/works.scss";
import Header from '../components/Header';
import AmplifyProvider from '../components/AmplifyProvider';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  title: "TAKATO OISHI PORTFOLIO SITE",
  description: "大石崇登のポートフォリオサイトです",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    noimageindex: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${figtree.variable}`}>
      <body className="has-[.micromodal-slide.is-open]:overflow-hidden overflow-x-hidden" id="profile-bg-transition">
        <AmplifyProvider>
          <Header />
          {children}
        </AmplifyProvider>
      </body>
    </html>
  );
}