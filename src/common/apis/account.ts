import axios from 'configs/axios'

const AccountApi = {
  login: async (body) => {
    const res = await axios.post('/api/account/login', body)
    return res.data
  },
  getCurrentUser: async () => {
    const res = await axios.get('/api/account/current-user')
    return res.data
  },
}

export default AccountApi
