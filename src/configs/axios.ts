import axios from 'axios'

const customAxios = axios.create({
  baseURL: process.env.REACT_PUBLIC_API_URL || 'http://localhost:8000',
})

customAxios.interceptors.request.use(
  async (config: any) => {
    return config
  },
  (error: any) => {
    Promise.reject(error)
  },
)

customAxios.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    Promise.reject(error)
  },
)
export default customAxios
