import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sea Lens Project",
  description: "Ekspedisi jurnalisme partisipatif mengangkat krisis ekosistem laut di Sumatera Barat.",
  openGraph: {
    title: "Sea Lens Project",
    description: "Ekspedisi jurnalisme partisipatif mengangkat krisis ekosistem laut di Sumatera Barat.",
    url: "https://sealensproject.com", // Ganti dengan URL website aslimu nanti jika sudah di-hosting
    siteName: "Sea Lens Project",
    images: [
      {
        url: "/images/og-image.png", // Pastikan ekstensi file sesuai (.png / .jpg / .jpeg)
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
    images: ["/images/og-image.png"], // Pastikan ekstensi file sesuai
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