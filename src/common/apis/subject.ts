import axios from 'configs/axios'

const SubjectApi = {
  getAll: async (query = {}) => {
    const res = await axios.get('/api/subject', { params: query })
    return res.data
  },
  create: async (body) => {
    const res = await axios.post('/api/subject', body)
    return res.data
  },
  getById: async (id) => {
    const res = await axios.get('/api/subject/' + id)
    return res.data
  },
  updateById: async (id, body) => {
    const res = await axios.put('/api/subject/' + id, body)
    return res.data
  },
  deleteById: async (id) => {
    const res = await axios.delete('/api/subject/' + id)
    return res.data
  },
}

export default SubjectApi
