import { TaskType } from '@/entities/Task/types'

export interface UserType {
	id: number
	fullName: string
	email: string
	colorAvatar: string
	Tasks?: TaskType[]
}
