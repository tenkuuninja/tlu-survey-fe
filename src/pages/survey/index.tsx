import { Skeleton } from '@mui/material'
import { Paper } from '@mui/material'
import SurveyApi from 'common/apis/survey'
import SurveyResult from 'common/components/SurveyResult'
import { shuffleArray } from 'common/helpers/array'
import useAuth from 'common/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SurveyForm from './SurveyForm'
import { Helmet } from 'react-helmet'

const SurveyPage = () => {
  const [isLoading, setLoading] = useState(true)
  const [isSubmited, setSubmited] = useState(false)
  const [isSended, setSended] = useState(false)
  const [isError, setError] = useState(false)
  const [survey, setSurvey] = useState<any>(null)
  const [answers, setAnswers] = useState<any[]>([])
  const params: any = useParams()
  const { user, role } = useAuth()

  const id = +params?.slug.replace(/\D.*$/g, '')

  console.log('survey', survey)

  useEffect(() => {
    const handleGetSurvey = async () => {
      setLoading(true)
      try {
        const resSurvey = await SurveyApi.getById(id)
        if (resSurvey?.data?.option?.shuffle_question_order) {
          shuffleArray(resSurvey?.data?.questions)
        }
        setSurvey(resSurvey?.data)

        const resAnswer = await SurveyApi.getAnswer(id, user.id)
        setAnswers(resAnswer?.data)
        if (resAnswer?.data?.length > 0) {
          setSubmited(true)
        }
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
    if (!Number.isNaN(id)) {
      handleGetSurvey()
    }
  }, [id])

  if (Number.isNaN(id)) {
    return <>404</>
  }

  if (isLoading) {
    return (
      <Paper className="mx-auto mt-4 max-w-[576px] space-y-4 py-4 px-4">
        <Helmet>
          <title>Đang tải | Trang khảo sát Đại học Thuỷ Lợi</title>
        </Helmet>
        <Skeleton height={30} />
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </Paper>
    )
  }

  if (isError) {
    return (
      <>
        <Helmet>
          <title>Lỗi | Trang khảo sát Đại học Thuỷ Lợi</title>
        </Helmet>
        <SurveyResult
          survey={survey}
          answers={answers}
          messageType="error"
          message="Không tìm thấy khảo sát. Có thể liên kết bị sai hoặc bạn không có quyền thực hiện khảo sát này"
          hideResult={true}
        />
      </>
    )
  }

  if (isSubmited && !!survey?.option?.limit) {
    return (
      <>
        <Helmet>
          <title>Khảo sát | Trang khảo sát Đại học Thuỷ Lợi</title>
        </Helmet>
        <SurveyResult
          survey={survey}
          answers={answers}
          messageType="error"
          message="Khảo sát này chỉ được thực hiện 1 lần. Bạn đã tham gia khảo sát này"
          hideResult={!survey?.option?.view_results}
        />
      </>
    )
  }

  if (isSended) {
    return (
      <>
        <Helmet>
          <title>Biểu mẫu đã được gửi | Trang khảo sát Đại học Thuỷ Lợi</title>
        </Helmet>
        <SurveyResult
          survey={survey}
          answers={answers}
          messageType="success"
          message="Câu trả lời của bạn đã được ghi lại"
          hideResult={!survey?.option?.view_results}
        />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Khảo sát | Trang khảo sát Đại học Thuỷ Lợi</title>
      </Helmet>
      <SurveyForm
        survey={survey}
        onSuccess={async () => {
          const resAnswer = await SurveyApi.getAnswer(id, user.id)
          setAnswers(resAnswer?.data)
          if (resAnswer?.data?.length > 0) {
            setSended(true)
          }
        }}
      />
    </>
  )
}

export default SurveyPage
