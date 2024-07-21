import axios from 'axios'

const instance = axios.create({
	// baseURL: process.env.SERVER_URL,
	baseURL: 'https://todobackend-production-77ec.up.railway.app',
})

export default instance

// 'http://localhost:4444'
