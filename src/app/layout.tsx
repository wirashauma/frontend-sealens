import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sealens-project.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sea Lens Project",
  description: "Ekspedisi jurnalisme partisipatif mengangkat krisis ekosistem laut di Sumatera Barat.",
  openGraph: {
    title: "Sea Lens Project",
    description: "Ekspedisi jurnalisme partisipatif mengangkat krisis ekosistem laut di Sumatera Barat.",
    url: "/",
    siteName: "Sea Lens Project",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sea Lens Project - Open Graph Image",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sea Lens Project",
    description: "Ekspedisi jurnalisme partisipatif mengangkat krisis ekosistem laut di Sumatera Barat.",
    images: ["images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id" // Mengubah dari "en" ke "id" karena website berbahasa Indonesia
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}