import axios from '@/axios'
import { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error("An email address and password are required!")
				}

				const requestData = {
					email: credentials.email,
					password: credentials.password,
				}

				const res = await axios.post("/user/signin", requestData);
				const user = res.data.user;
				console.log("_Auth configs_: ", res.data)

				const userData = {
					id: user.id,
					name: user.fullName,
					email: user.email
				}

				if (userData) {
					return userData
				} else {
					throw new Error(res.data.message)
				}
			},
		})
	],
	pages: {
		signIn: "/signin"
	},
}