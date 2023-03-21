import axios from 'configs/axios'

const GradeApi = {
  getAll: async (filter = {}) => {
    const res = await axios.get('/api/grade-level', { params: filter })
    return res.data
  },
}

export default GradeApi
