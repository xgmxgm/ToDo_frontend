import axios from '@/axios'
import { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
	session: {
		strategy: "jwt",
	},
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
				console.log("_Auth configs_: ", res.data)
				const user = res.data.userData;

				if (user) {
					return user
				}
			},
		})
	],
	pages: {
		signIn: "/signin"
	}
}