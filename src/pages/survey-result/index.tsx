import { MenuItem, Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import SurveyApi from 'common/apis/survey'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const SurveyPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [survey, setSurvey] = useState<any>()
  const params: any = useParams()

  const id = +params?.slug

  const formik = useFormik({
    initialValues: {} as any,
    validateOnChange: false,
    validateOnBlur: false,
    async onSubmit(values) {
      setLoading(true)
      try {
        const answers: any[] = []
        for (const ansInfo of values) {
          if (!!ansInfo.answer_text) {
            delete ansInfo.option_ids
            answers.push(ansInfo)
          }
          if (ansInfo.option_id !== null) {
            delete ansInfo.option_ids
            answers.push(ansInfo)
          }
          if (Array.isArray(ansInfo.option_ids)) {
            answers.push(
              ...ansInfo.option_ids?.map((qid) => ({
                ...ansInfo,
                option_id: qid,
                option_ids: undefined,
              })),
            )
          }
        }
        console.log('form', values, answers)
        await SurveyApi.submitFormSurvey({
          answers,
          section: {
            teacher_id: null,
            student_id: null,
            survey_id: null,
            completed_on: new Date().toISOString(),
          },
          type: 'student',
        })
      } catch (error) {
        toast.error('Đã có lỗi xảy ra')
      }
      setLoading(false)
    },
  })

  useEffect(() => {
    const handleGetSurvey = async () => {
      const res = await SurveyApi.getById(id)
      setSurvey(res?.data)
      formik.setValues(
        res?.data?.questions?.map((item) => ({
          teacher_id: null,
          student_id: null,
          question_id: item?.id || null,
          option_id: null,
          option_ids: [],
          answer_text: null,
        })),
      )
    }
    if (!Number.isNaN(id)) {
      handleGetSurvey()
    }
  }, [])

  if (Number.isNaN(id)) {
    return <>404</>
  }

  return (
    <form className="mx-auto max-w-[576px] py-4" onSubmit={formik.handleSubmit}>
      <Paper sx={{ p: 2 }}>
        <h1 className="text-[28px]">{survey?.title}</h1>
      </Paper>
      {survey?.questions.map((question, i) => (
        <Paper className="" sx={{ p: 2, mt: 2 }} key={i}>
          <h3>{question?.title}</h3>
          {question?.type_id === 1 && (
            <div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name={`[${i}].option_id`}
                onChange={formik.handleChange}
              >
                {question?.options?.map((option, j) => (
                  <FormControlLabel
                    value={option.id}
                    control={<Radio />}
                    label={option?.title}
                    checked={+formik.values?.[i]?.option_id === option?.id}
                    key={j}
                  />
                ))}
              </RadioGroup>
            </div>
          )}
          {question?.type_id === 2 && (
            <div>
              <FormGroup>
                {question?.options?.map((option, j) => (
                  <FormControlLabel
                    label={option?.title}
                    control={<Checkbox />}
                    checked={
                      !!formik.values?.[i]?.option_ids?.includes(option?.id)
                    }
                    onChange={(e, checked) => {
                      const newValue = formik.values?.[i]?.option_ids?.filter?.(
                        (item) => item !== option?.id,
                      )
                      if (checked) {
                        newValue.push(option?.id)
                      }
                      formik.setFieldValue(`[${i}].option_ids`, newValue)
                    }}
                    key={j}
                  />
                ))}
              </FormGroup>
            </div>
          )}
          {question?.type_id === 3 && (
            <div>
              <Select
                size="small"
                name={`[${i}].option_id`}
                onChange={formik.handleChange}
                sx={{ width: 300, mt: 2 }}
              >
                {question?.options?.map((option, j) => (
                  <MenuItem value={option.id} key={j}>
                    {option?.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          {question?.type_id === 4 && (
            <div>
              <TextField
                size="small"
                multiline
                minRows={4}
                fullWidth
                name={`[${i}].answer_text`}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
              />
            </div>
          )}
        </Paper>
      ))}
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained">
          Gửi
        </Button>
      </Box>
    </form>
  )
}

export default SurveyPage
