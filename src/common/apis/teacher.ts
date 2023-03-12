import axios from 'configs/axios'

const TeacherApi = {
  getAll: async (query = {}) => {
    const res = await axios.get('/api/teacher', { params: query })
    return res.data
  },
  create: async (body) => {
    const res = await axios.post('/api/teacher', body)
    return res.data
  },
  getById: async (id) => {
    const res = await axios.get('/api/teacher/' + id)
    return res.data
  },
  updateById: async (id, body) => {
    const res = await axios.put('/api/teacher/' + id, body)
    return res.data
  },
  deleteById: async (id) => {
    const res = await axios.delete('/api/teacher/' + id)
    return res.data
  },
}

export default TeacherApi
