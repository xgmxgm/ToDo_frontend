export interface TaskType {
	id: number
	title: string
	isComplete: boolean
	authorId: number
	subTasks: SubTaskType[]
}

export interface SubTaskType {
	id: number
	title: string
	isComplete: boolean
	taskId: number
}

export interface DeleteTaskType {
	id: number
	showModal: boolean
	setShowModal: (showModal: boolean) => void
}

export interface DeleteSubTaskType {
	id: number
	showModal: boolean
	setShowModal: (showModal: boolean) => void
}

export interface CreateTaskType {
	showModal: boolean
	setShowModal: (showModal: boolean) => void
	taskTitle: string
	setTaskTitle: (taskTitle: string) => void
}

export interface CreateSubTaskType {
	taskId: number
	showModal: boolean
	setShowModal: (showModal: boolean) => void
	subTaskTitle: string
	setSubTaskTitle: (taskTitle: string) => void
}

export interface ChangeTaskType {}
