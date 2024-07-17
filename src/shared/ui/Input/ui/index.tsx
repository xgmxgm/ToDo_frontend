interface IProps {
	state: string
	setState: (value: string) => void
	placeholder?: string
	type: 'text' | 'email' | 'password'
	name?: string
	error?: boolean
}

export const Input = ({
	state,
	setState,
	placeholder,
	type,
	name,
	error,
}: IProps) => {
	return (
		<input
			className={`rounded-md font-medium outline-none px-4 py-2 bg-transparent border-[1px] ${
				!error ? 'border-[#707088]' : 'border-red-500'
			} my-2 transition-all duration-200 focus:bg-slate-100 focus:text-[#707088] w-full`}
			type={type}
			value={state}
			onChange={e => setState(e.target.value)}
			placeholder={placeholder}
			name={name}
			required
		/>
	)
}
