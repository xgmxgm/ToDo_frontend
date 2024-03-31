import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do App",
  description: "Next To Do App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='bg-gray-200'>
      <Providers>
        <body className={inter.className}>
          <header></header>
          <main>
            {children}
          </main>
          <footer></footer>
        </body>
      </Providers>
    </html>
  );
}
