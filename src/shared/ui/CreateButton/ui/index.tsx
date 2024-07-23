import Image from 'next/image'

interface IProps {
	setState: (state: boolean) => void
}

export const CreateButton = ({ setState }: IProps) => {
	return (
		<button
			className='fixed bottom-3 left-14 -translate-x-2/4 -translate-y-2/4 bg-[#5A54D6] w-14 h-14 rounded-[100%] hover:bg-[#413c9a] transition-all flex items-center justify-center z-20'
			onClick={() => setState(true)}
		>
			<p className='font-semibold text-7xl flex items-center justify-center'>
				<Image
					src='/cross.svg'
					alt='icon'
					width={15}
					height={15}
					style={{ rotate: '45deg' }}
				/>
			</p>
		</button>
	)
}
