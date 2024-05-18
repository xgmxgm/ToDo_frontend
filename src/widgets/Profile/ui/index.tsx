import { authOptions } from '@/configs/auth'
import { getServerSession } from 'next-auth'

export const Profile = async () => {
	const session = await getServerSession(authOptions);

	return (
		<>
			<div>
				<div>
					<h2>Profile page</h2>
					<h3>{session?.user?.name || "no name"}</h3>
					<h3>{session?.user?.email || "no email"}</h3>
				</div>
			</div>
		</>
	)
}