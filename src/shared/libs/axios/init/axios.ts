import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.SERVER_URL,
})

export default instance
