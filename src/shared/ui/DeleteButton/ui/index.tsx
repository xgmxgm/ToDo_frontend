'use client'

import Image from 'next/image'

interface IProps {
	setState: (state: boolean) => void
}

export const DeleteButton = ({ setState }: IProps) => {
	return (
		<button onClick={() => setState(true)}>
			<Image src='/delete.svg' alt='icon' width={27} height={27} />
		</button>
	)
}
