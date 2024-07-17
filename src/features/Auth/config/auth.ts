import Credentials from 'next-auth/providers/credentials'
import axios from '@/shared/libs/axios/init/axios'
import type { AuthOptions } from 'next-auth'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const authOptions: AuthOptions = {
	providers: [
		Credentials({
			name: 'Sign In',
			credentials: {
				email: { label: 'email', type: 'email', required: true },
				password: { label: 'password', type: 'password', required: true },
				fullName: { label: 'fullname', type: 'text', required: false },
				colorAvatar: { label: 'fullname', type: 'text', required: false },
				entry: { label: 'entry', type: 'text', required: true },
			},
			async authorize(credentials) {
				if (!credentials || !credentials?.email || !credentials.password) {
					return null
				}

				if (credentials.entry == 'signIn') {
					try {
						const signinResponse = await axios.post('/user/signin', {
							email: credentials.email,
							password: credentials.password,
						})

						if (signinResponse.data.token) {
							const token = signinResponse.data.token
							const decodedToken = jwt.verify(
								token,
								process.env.NEXTAUTH_SECRET as string
							) as any

							if (decodedToken) {
								const user = {
									...decodedToken,
									token: token,
								}

								return user
							}
						}
					} catch (signinError: any) {
						throw new Error(signinError.response.data.message)
					}
				}

				if (credentials.entry == 'signUp') {
					try {
						const signupResponse = await axios.post('/user/signup', {
							fullName: credentials.fullName,
							email: credentials.email,
							password: credentials.password,
							colorAvatar: credentials.colorAvatar,
						})

						if (signupResponse.data.token) {
							const token = signupResponse.data.token
							const decodedToken = jwt.verify(
								token,
								process.env.NEXTAUTH_SECRET as string
							) as any

							if (decodedToken) {
								const user = {
									...decodedToken,
									Tasks: [],
									token: token,
								}
								return user
							}
						}
					} catch (signupError: any) {
						throw new Error(signupError.response.data.message)
					}
				}

				return null
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === 'update' && session) return { ...token, ...session.user }
			return { ...token, ...user }
		},
		async session({ session, token }) {
			session.user = token as any

			return session
		},
	},
	pages: {
		signIn: '/signin',
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
}
