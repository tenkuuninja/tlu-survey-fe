import axios from 'axios'
import { toast } from 'react-toastify'

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
})

customAxios.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem('tlu:token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
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
    const errorMessage = error?.response?.data?.errorMessage
    if (errorMessage) {
      toast.error(errorMessage)
    }
    Promise.reject(error)
  },
)
export default customAxios
