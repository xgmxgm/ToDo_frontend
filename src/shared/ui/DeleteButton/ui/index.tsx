"use client"

import { deleteTask } from '@/store/Slice/TaskSlice'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import axios from "@/axios"

interface IProps {
	id: number,
	index: number,
}

export const DeleteButton = ({ id, index }: IProps) => {
	const dispatch = useDispatch();

	const handleFetch = async () => {
		const req = {
			ids: [id]
		}

		const res = await axios.post("/task/delete", req)

		dispatch(deleteTask(index))

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