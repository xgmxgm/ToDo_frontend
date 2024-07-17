import { ProfileHeader } from '@/widgets/Header/ui/ProfileHeader'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
	return (
		<header className='w-full flex items-center justify-between py-3 mb-4 border-b-[1px] border-[#26272F] bg-[#21222B]'>
			<Link href='/'>
				<h2 className='text-xl font-semibold ml-8'>
					To Do App <span className='text-red-500'>by XGM</span>
				</h2>
			</Link>
			<ProfileHeader />
		</header>
	)
}
