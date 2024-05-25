import { ProfileHeader } from '@/widgets/ProfileHeader'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
	return (
		<>
			<div>
				<div className='w-full flex items-center justify-between py-3 mb-4 border-b-[1px] border-[#26272F]'>
					<Link href="/">
						<h2 className='text-xl font-semibold ml-8'>To Do App <span className='text-red-500'>by XGM</span></h2>
					</Link>
					<ProfileHeader />
				</div>
			</div>
		</>
	)
}