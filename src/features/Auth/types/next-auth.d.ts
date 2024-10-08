declare module 'next-auth' {
	interface Session {
		user: {
			id: number
			fullName: string
			email: string
			colorAvatar: string
			accessToken: string
			refreshToken: string
		}
	}
}

export interface ITask {
	id: number
	title: string
	isComplete: boolean
	authorId: number
}

export interface IUser {
	user: {
		id: number
		fullName: string
		email: string
		avatarURL: string
	}
}
