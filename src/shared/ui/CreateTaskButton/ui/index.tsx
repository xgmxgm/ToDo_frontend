interface IProps {
	setState: (state: boolean) => void
}

export const CreateTaskButton = ({ setState }: IProps) => {
	return (
		<>
			<div>
				<button
					className='fixed bottom-3 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-[#5A54D6] px-8 py-3 rounded-md hover:bg-[#413c9a] transition-all'
					onClick={() => setState(true)}
				>
					<p className='font-semibold'>+ Add New Task</p>
				</button>
			</div>
		</>
	)
}