import { Providers } from '@/components/Providers'
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from '@/widgets/Header'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do App",
  description: "Next JS To Do App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <header className='bg-[#21222B]'>
            <Header />
          </header>
          <main>
            {children}
          </main>
          <footer></footer>
        </body>
      </Providers>
    </html>
  );
}