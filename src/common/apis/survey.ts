import axios from 'configs/axios'

const SurveyApi = {
  getAll: async (filter = {}) => {
    const res = await axios.get('/api/survey', { params: filter })
    return res.data
  },
  create: async (body) => {
    const res = await axios.post('/api/survey', body)
    return res.data
  },
  getById: async (id) => {
    const res = await axios.get('/api/survey/' + id)
    return res.data
  },
  updateById: async (id, body) => {
    const res = await axios.put('/api/survey/' + id, body)
    return res.data
  },
  deleteById: async (id) => {
    const res = await axios.delete('/api/survey/' + id)
    return res.data
  },
  submitFormSurvey: async (body) => {
    const res = await axios.post('/api/survey/submit-form', body)
    return res.data
  },
  getAnswer: async (surveyId, userId) => {
    const res = await axios.get(`/api/survey/${surveyId}/answer/${userId}`)
    return res.data
  },
  getAnswerBySurveyId: async (surveyId) => {
    const res = await axios.get(`/api/survey/${surveyId}/answer`)
    return res.data
  },
  getSurveyOption: async (surveyId) => {
    const res = await axios.get(`/api/survey/${surveyId}/option`)
    return res.data
  },
  updateSurveyOption: async (surveyId, body) => {
    const res = await axios.put(`/api/survey/${surveyId}/option`, body)
    return res.data
  },
}

export default SurveyApi
