import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rtkApi = createApi({
	reducerPath: 'api',
	tagTypes: ['Task'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://todobackend-production-77ec.up.railway.app',
	}),
	endpoints: () => ({}),
})
