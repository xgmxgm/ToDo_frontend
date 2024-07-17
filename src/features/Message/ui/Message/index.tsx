import { motion } from 'framer-motion'
import { MessageType } from '../../types'
import { useEffect } from 'react'

export const Message = ({ children, isVisible, setIsVisible }: MessageType) => {
	const pVariants = {
		hidden: {
			y: -100,
			opacity: 0,
		},
		visible: {
			y: 6,
			opacity: 1,
		},
	}

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				setIsVisible(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	})

	return (
		<motion.div
			initial='hidden'
			animate={isVisible ? 'visible' : 'hidden'}
			variants={pVariants}
			className='fixed top-0 left-[50%] z-20'
		>
			<div className='bg-[#181920] text-center py-2 px-4 rounded-lg border-2 border-red-500 -translate-x-2/4'>
				{children}
			</div>
		</motion.div>
	)
}
