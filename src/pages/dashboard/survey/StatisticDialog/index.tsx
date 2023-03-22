import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material'
import SurveyApi from 'common/apis/survey'
import SurveyResult from 'common/components/SurveyResult'
import useAuth from 'common/hooks/useAuth'
import { useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import PersonalDetail from './PersonalDetail'
import QuestionDetail from './QuestionDetail'
import Summary from './Summary'

const StatisticDialog = ({ open, onClose, data, onSuccess }) => {
  const { user, role } = useAuth()
  const [isLoading, setLoading] = useState(false)
  const [tabActive, setTabActive] = useState(0)
  const [answers, setAnswers] = useState([])
  const isUpdate = !!data?.id

  useEffect(() => {
    const handleGetAnswerData = async () => {
      const answerRes = await SurveyApi.getAnswerBySurveyId(data?.id)
      setAnswers(answerRes?.data)
    }
    if (data?.id) {
      handleGetAnswerData()
    }
  }, [data?.id])

  useEffect(() => {
    if (open) {
      if (role === 'student') {
        setTabActive(2)
      } else {
        setTabActive(0)
      }
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thống biểu mẫu khảo sát</DialogTitle>
      <DialogContent>
        <Tabs
          value={tabActive}
          onChange={(e, v) => setTabActive(v)}
          aria-label="basic tabs example"
        >
          <Tab value={0} label="Tóm tắt" />
          <Tab value={1} label="Bản câu hỏi" />
          <Tab value={2} label="Cá nhân" />
        </Tabs>
        {tabActive === 0 && <Summary survey={data} answers={answers} />}
        {tabActive === 1 && <QuestionDetail survey={data} answers={answers} />}
        {tabActive === 2 && <PersonalDetail survey={data} answers={answers} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          startIcon={<AiOutlineEdit />}
        >
          {isUpdate ? 'Sửa' : 'Thêm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StatisticDialog
