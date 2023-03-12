import axios from 'configs/axios'

const StudentApi = {
  getAll: async (query = {}) => {
    const res = await axios.get('/api/student', { params: query })
    return res.data
  },
  create: async (body) => {
    const res = await axios.post('/api/student', body)
    return res.data
  },
  getById: async (id) => {
    const res = await axios.get('/api/student/' + id)
    return res.data
  },
  updateById: async (id, body) => {
    const res = await axios.put('/api/student/' + id, body)
    return res.data
  },
  deleteById: async (id) => {
    const res = await axios.delete('/api/student/' + id)
    return res.data
  },
}

export default StudentApi
