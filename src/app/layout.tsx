import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Header } from '@/widgets/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'To Do App',
	description: 'Next JS To Do App',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<Providers>
				<body className={inter.className}>
					<Header />
					<main>{children}</main>
					<footer></footer>
				</body>
			</Providers>
		</html>
	)
}
