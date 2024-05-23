'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

export const Main = () => {
	return (
		<>
			<Link href="signup">Sign Up</Link>
			<Link href="signin">Sign In</Link>
			<button onClick={() => signOut()}>sign out</button>
		</>
	);
}