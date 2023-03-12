import axios from 'configs/axios'

const ClassApi = {
  getAll: async (query = {}) => {
    const res = await axios.get('/api/class', { params: query })
    return res.data
  },
  create: async (body) => {
    const res = await axios.post('/api/class', body)
    return res.data
  },
  getById: async (id) => {
    const res = await axios.get('/api/class/' + id)
    return res.data
  },
  updateById: async (id, body) => {
    const res = await axios.put('/api/class/' + id, body)
    return res.data
  },
  deleteById: async (id) => {
    const res = await axios.delete('/api/class/' + id)
    return res.data
  },
}

export default ClassApi
