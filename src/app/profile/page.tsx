import { Profile } from '@/widgets/Profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Profile",
	description: "To Do App Profile Page",
};

const ProfilePage = () => {
	return (
		<>
			<div>
				<Profile />
			</div>
		</>
	)
}

export default ProfilePage