import Image from 'next/image'

interface IProps {
	state: boolean,
	setState: (state: boolean) => void,
}

export const ShowButton = ({ state, setState }: IProps) => {
	return (
		<>
			<div>
				<button
					className='bg-[#21222B] rounded-md p-2 ml-2'
					onClick={() => setState(!state)}
					type='button'
				>
					{
						state ?
						<Image src="/eyesOpened.svg" alt='icon' width={27} height={27} /> :
						<Image src="/eyesClosed.svg" alt='icon' width={27} height={27} />
					}
				</button>
			</div>
		</>
	)
}