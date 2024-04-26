import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

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
      <body className={`${inter.className} bg-gray-100`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
