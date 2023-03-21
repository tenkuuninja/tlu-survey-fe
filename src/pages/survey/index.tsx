import SurveyApi from 'common/apis/survey'
import SurveyResult from 'common/components/SurveyResult'
import useAuth from 'common/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SurveyForm from './SurveyForm'

const SurveyPage = () => {
  const [isLoading, setLoading] = useState(true)
  const [isSubmited, setSubmited] = useState(false)
  const [survey, setSurvey] = useState<any>(null)
  const [answers, setAnswers] = useState<any[]>([])
  const params: any = useParams()
  const { user, role } = useAuth()

  const id = +params?.slug

  console.log('survey', survey)

  useEffect(() => {
    const handleGetSurvey = async () => {
      setLoading(true)
      const resSurvey = await SurveyApi.getById(id)
      setSurvey(resSurvey?.data)

      const resAnswer = await SurveyApi.getAnswer(resSurvey?.data?.id, user.id)
      setAnswers(resAnswer?.data)
      if (resAnswer?.data?.length > 0) {
        setSubmited(true)
      }
      setLoading(false)
    }
    if (!Number.isNaN(id)) {
      handleGetSurvey()
    }
  }, [])

  if (Number.isNaN(id)) {
    return <>404</>
  }

  if (isLoading) {
    return <></>
  }

  if (isSubmited) {
    return <SurveyResult survey={survey} answers={answers} />
  }

  return (
    <SurveyForm
      survey={survey}
      onSuccess={async () => {
        const resAnswer = await SurveyApi.getAnswer(id, user.id)
        setAnswers(resAnswer?.data)
        if (resAnswer?.data?.length > 0) {
          setSubmited(true)
        }
      }}
    />
  )
}

export default SurveyPage
