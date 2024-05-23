import Credentials from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import jwt from 'jsonwebtoken';
import axios from '@/axios';
import dotenv from 'dotenv';

dotenv.config();

export const authOptions: AuthOptions = {
	providers: [
		Credentials({
			name: "Sign In",
			credentials: {
				email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true }
			},
			async authorize(credentials) {

					if (!credentials || !credentials?.email || !credentials.password) {
						return null
					}

				try {
					const req = {
						email: credentials.email,
						password: credentials.password,
					};
	
					const res = await axios.post("/user/signin", req);
	
					const token = res.data.token;
	
					const decodeToken = jwt.verify(token, process.env.SECRET_KEY as string) as any;
	
					if (decodeToken) {
						const user = {
							...decodeToken,
							token: token,
						}
	
						return user
					} else {
						return null
					}
				} catch (err) {
					console.error(err)
					return null
				}
			},
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			return {...token, ...user}
		},
		async session({ session, token }) {
			session.user = token as any;
			return session
		},
	},
	pages: {
		signIn: "/signin"
	}
}