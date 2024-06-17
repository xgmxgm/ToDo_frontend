import { useSession } from 'next-auth/react'
import Image from 'next/image'
import axios from "@/axios"

interface IProps {
	id: number,
	index: number,
}

export const DeleteButton = ({ id, index }: IProps) => {
	const { data: session } = useSession();

	const handleFetch = async () => {
		const req = {
			ids: [id]
		}

		const res = await axios.post("/task/delete", req)

		// session?.user.Tasks.splice(index, 1)
		delete session?.user.Tasks[index]

		console.log(res)
	}

	return (
		<>
			<button onClick={() => handleFetch()}>
				<Image src="/delete.svg" alt='icon' width={27} height={27} />
			</button>
		</>
	)
}