"use client"

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import axios from "@/axios"

interface IProps {
	id: number,
	index: number,
}

export const DeleteButton = ({ id, index }: IProps) => {
	const { data: session, update } = useSession();

	const DeleteTaskFetch = async () => {
		const req = {
			ids: [id]
		}

		const res = await axios.post("/task/delete", req)

		if (res.data) {
			const newSession = {
				...session,
			}

			newSession.user?.Tasks.splice(index, 1)
			await update(newSession)
		}
	}

	return (
		<>
			<button onClick={() => DeleteTaskFetch()}>
				<Image src="/delete.svg" alt='icon' width={27} height={27} />
			</button>
		</>
	)
}