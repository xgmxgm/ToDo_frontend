declare module "next-auth" {
	interface Session {
		user: {
			id: number;
			fullName: string;
			email: string;
			colorAvatar: string;
			Tasks: ITask[];
		}
	}
}

export interface ITask {
	id: number;
	title: string;
	isComplete: boolean;
	description: string;
	authorId: number;
}

export interface IUser {
	user: {
		id: number;
		fullName: string;
		email: string;
		avatarURL: string;
		Tasks: ITask[];
	}
}