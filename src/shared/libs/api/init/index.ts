import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession, signOut } from 'next-auth/react'

const refreshAccessToken = async () => {
	const session = await getSession()
	if (!session || !session.user.refreshToken) {
		throw new Error('No refresh token available')
	}

	const response = await fetch(
		`${process.env.SERVER_URL}/user/refresh` ||
			'http://localhost:4444/user/refresh',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refreshToken: session.user.refreshToken }),
		}
	)

	if (!response.ok) {
		throw new Error('Failed to refresh token')
	}

	const data = await response.json()
	return data.accessToken
}

const baseQuery = async (args: any, api: any, extraOptions: any) => {
	let result = await fetchBaseQuery({
		baseUrl: process.env.SERVER_URL || 'http://localhost:4444',
		prepareHeaders: async headers => {
			const session = await getSession()
			if (session?.user.accessToken) {
				headers.set('Authorization', `Bearer ${session.user.accessToken}`)
			}
			return headers
		},
	})(args, api, extraOptions)

	if (result.error && result.error.status === 401) {
		try {
			const newToken = await refreshAccessToken()

			result = await fetchBaseQuery({
				baseUrl: process.env.SERVER_URL || 'http://localhost:4444',
				prepareHeaders: headers => {
					headers.set('Authorization', `Bearer ${newToken}`)
					return headers
				},
			})(args, api, extraOptions)
		} catch (error) {
			console.error('Failed to refresh token:', error)
			signOut()
		}
	}

	return result
}

export const rtkApi = createApi({
	reducerPath: 'api',
	tagTypes: ['Task'],
	baseQuery,
	endpoints: () => ({}),
})
