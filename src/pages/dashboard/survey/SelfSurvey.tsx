import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import SurveyApi from 'common/apis/survey'
import SurveyResult from 'common/components/SurveyResult'
import useAuth from 'common/hooks/useAuth'
import { useEffect, useState } from 'react'

const SelfSurveyDialog = ({ open, onClose, data }) => {
  const { user } = useAuth()
  const [isLoading, setLoading] = useState(false)
  const [userAnswer, setUserAnswer] = useState([])

  useEffect(() => {
    const handleGetAnswerData = async () => {
      const userAnswerRes = await SurveyApi.getAnswer(data?.id, user.id)
      setUserAnswer(userAnswerRes?.data)
    }
    if (data?.id) {
      handleGetAnswerData()
    }
  }, [data?.id])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Khảo sát của tôi</DialogTitle>
      <DialogContent>
        <SurveyResult survey={data} answers={userAnswer} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelfSurveyDialog
