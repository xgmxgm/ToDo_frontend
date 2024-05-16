import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/Providers'

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
            <div className='w-full flex items-center py-3 border-b-[1px] border-[#26272F]'>
              <h2 className='text-xl font-semibold ml-8'>To Do App <span className='text-red-500'>by XGM</span></h2>
            </div>
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