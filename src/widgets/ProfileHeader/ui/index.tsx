"use client"

import Link from 'next/link'
import React from 'react'
import { Links } from '../data'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export const ProfileHeader = () => {
	const { data: session, status } = useSession()

	if (status == "loading") {
		return (
			<>
				<div className='mr-4'>
					<div className='w-9'>
						<p>Loading...</p>
					</div>
				</div>
			</>
		)
	}

	if (!session) {
		return (
			<>
				<div className='mr-4'>
					<div>
						{
							Links.map((link, index) => <Link className='mx-2 transition-all hover:text-[#5A54D6]' key={index} href={link.href}>{link.text}</Link>)
						}
					</div>
				</div>
			</>
		)
	}

	if (session) {
		return (
			<>
				<div className='mr-4'>
					<div className='flex items-center rounded-full'>
						<div className='flex flex-col text-center border-r-2 border-slate-300 pr-3'>
							<Link href="/profile" className='text-[15px] text-gray-500 transition-all hover:text-slate-300'>{session.user.fullName}</Link>
							<Link className='mx-2 transition-all hover:text-red-500' href="" onClick={() => signOut()}>Sign Out</Link>
						</div>
						<div className='bg-[#181920] rounded-full ml-3'>
							<Image src={session.user.avatarURL == "defaultUser.png" ? "defaultUser.svg" : "/" + session.user.avatarURL} alt='default user' width={30} height={30} className='m-2' />
						</div>
					</div>
				</div>
			</>
		)
	}
}