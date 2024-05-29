interface IProps {
	id: string
	name: string,
	setState: (state: any) => void,
}

export const InputImg = ({ id, name, setState }: IProps) => {

	// const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
	const handleImageChange = (e: any) => {
		console.log(e.target.files[0]);
        setState(e.target.files[0]);
    };

	return (
		<>
			<input
				accept="image/*,.png,.jpg,.web"
				onChange={handleImageChange}
				className=''
				type="file"
				name={name}
				id={id}
			/>
		</>
	)
}