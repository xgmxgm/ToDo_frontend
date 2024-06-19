"use client"

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import axios from "@/axios"
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface IProps {
	id: number,
	index: number,
}

export const DeleteButton = ({ id, index }: IProps) => {
	// const { data: session } = useSession();
	const UserTasks = useSelector((state: RootState) => state.tasks);

	const handleFetch = async () => {
		const req = {
			ids: [id]
		}

		const res = await axios.post("/task/delete", req)

		// session?.user.Tasks.splice(index, 1)
		delete UserTasks[index]

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