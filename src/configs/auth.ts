import axios from '@/axios'
import { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken';

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
				console.log("_Auth configs_: ", res.data)
				const user = res.data.user;

				if (user) {
					console.log(user)

					// return {
					// 	...user,
					// 	token: res.data.token,
					// };

					return {
						name: user.fullName,
						email: user.email,
						...user
					}
				}

				return null;
			},
		})
	],
	// pages: {
	// 	signIn: "/signin"
	// },
}