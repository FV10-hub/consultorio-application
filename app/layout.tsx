import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conusltorio Medico APP",
  description: "Una aplicacion para seguimiento de pacientes",
  icons: {
    icon: [
      {
        url: "/images/favicon-light.png",
        href: "/images/favicon-light.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body data-theme="cupcake" className={`${inter.className} bg-gray-100`}>{children}</body>
    </html>
  );
}
