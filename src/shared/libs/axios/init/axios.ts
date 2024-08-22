import axios from 'axios'

const instance = axios.create({
	// baseURL: process.env.SERVER_URL,
	baseURL: 'http://localhost:4444',
})

instance.interceptors.response.use()

export default instance
