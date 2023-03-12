import axios from 'configs/axios'

const DepartmentApi = {
  getAll: async (filter = {}) => {
    const res = await axios.get('/api/department', { params: filter })
    return res.data
  },
}

export default DepartmentApi
