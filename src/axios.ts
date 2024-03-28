import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:4444/task"
})

export default instance