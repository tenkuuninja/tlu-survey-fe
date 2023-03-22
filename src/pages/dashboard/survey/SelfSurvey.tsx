import { Skeleton } from '@mui/material'
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
      setLoading(true)
      try {
        const userAnswerRes = await SurveyApi.getAnswer(data?.id, user.id)
        setUserAnswer(userAnswerRes?.data)
      } catch (error) {}
      setLoading(false)
    }
    if (data?.id) {
      handleGetAnswerData()
    }
  }, [data?.id])

  let content = <></>

  if (isLoading) {
    content = (
      <div className="space-y-3">
        <Skeleton height={30} />
        <Skeleton height={30} />
        <Skeleton height={30} />
        <Skeleton height={30} />
        <Skeleton height={30} />
        <Skeleton height={30} />
      </div>
    )
  } else if (!userAnswer?.length) {
    content = <p className="text-24px">Bạn chưa thực hiện khảo sát này</p>
  } else {
    content = (
      <>
        <SurveyResult survey={data} answers={userAnswer} />
      </>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Khảo sát của tôi</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelfSurveyDialog
