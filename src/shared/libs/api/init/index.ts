import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rtkApi = createApi({
	reducerPath: 'api',
	tagTypes: ['Task'],
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.SERVER_URL || 'http://localhost:4444',
	}),
	endpoints: () => ({}),
})