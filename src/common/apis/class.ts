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
  getListStudent: async (id) => {
    const res = await axios.get('/api/class/'+ id +'/student')
    return res.data
  },
  addStudentToClass: async (idclass, idstudent) => {
    const res = await axios.post('/api/class/'+ idclass +'/student/' + idstudent)
    return res.data
  },
  deleteStudentToClass: async (idclass, idstudent) => {
    const res = await axios.delete('/api/class/' + idclass + '/student/' + idstudent)
    return res.data
  },

}

export default ClassApi
