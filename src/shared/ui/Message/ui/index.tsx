import React from 'react'
import { motion } from 'framer-motion'

interface IProps {
	children: React.ReactNode,
	isVisible: boolean
}

export const Message = ({ children, isVisible }: IProps) => {
	const pVariants = {
        hidden: {
            y: -100,
            opacity: 0,
			x: '-50%'
        },
        visible: {
			y: 6,
			opacity: 1,
			x: '-50%'
		},
	}

	return (
		<>
			<motion.div
				initial='hidden'
				animate={ isVisible ? 'visible' : 'hidden'}
				variants={pVariants}
				className='fixed top-0 left-[50%]'
			>
				<div className='bg-[#181920] text-center py-2 px-4 rounded-lg border-2 border-red-500'>
					{children}
				</div>
			</motion.div>
		</>
	)
}