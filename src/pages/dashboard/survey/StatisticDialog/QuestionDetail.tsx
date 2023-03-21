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
import useAuth from 'common/hooks/useAuth'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface QuestionDetailProps {
  survey: any
  answers: any[]
}

export default function QuestionDetail({
  survey,
  answers,
}: QuestionDetailProps) {
  const [questionSelected, setQuestionSelected] = useState<any>(null)
  const params: any = useParams()
  const { user, role } = useAuth()

  const answerGroupByUserObj = useMemo(
    () =>
      answers
        ?.filter((item) => +item?.question_id === +questionSelected?.id)
        ?.reduce((acc, cur) => {
          if (!acc[cur.user_id]) {
            acc[cur.user_id] = {
              ...(cur.user || {}),
              options: [],
            }
          }
          acc[cur.user_id]?.options.push(cur)
          return acc
        }, {}),
    [questionSelected?.id],
  )
  console.log('answerGroupByUserObj', {
    questionSelected,
    answerGroupByUserObj,
  })

  useEffect(() => {
    setQuestionSelected(survey?.questions?.[0] || null)
  }, [survey])

  return (
    <form className="mx-auto max-w-[576px] py-4">
      <Paper sx={{ p: 2 }}>
        <h1 className="mb-[20px] text-[28px]">{survey?.title}</h1>
        <Select
          value={+questionSelected?.id}
          size="small"
          onChange={(e) =>
            setQuestionSelected(
              survey?.questions?.find((item) => +item?.id === +e.target.value),
            )
          }
          sx={{ width: 300 }}
        >
          {survey?.questions.map((question, i) => (
            <MenuItem value={+question?.id} key={i}>
              {question?.title}
            </MenuItem>
          ))}
        </Select>
      </Paper>
      {Object.values(answerGroupByUserObj).map((user: any, i) => (
        <Paper className="" sx={{ p: 2, mt: 2 }} key={i}>
          <h3>{user?.name} </h3>
          {questionSelected?.type_id === 1 && (
            <div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name={`[${i}].option_id`}
              >
                {user?.options?.map((option, j) => (
                  <FormControlLabel
                    value={option?.option_id}
                    control={<Radio />}
                    label={option?.option?.title}
                    checked={true}
                    key={j}
                  />
                ))}
              </RadioGroup>
            </div>
          )}
          {questionSelected?.type_id === 2 && (
            <div>
              <FormGroup>
                {user?.options?.map((option, j) => (
                  <FormControlLabel
                    label={option?.option?.title}
                    control={<Checkbox />}
                    checked={true}
                    key={j}
                  />
                ))}
              </FormGroup>
            </div>
          )}
          {questionSelected?.type_id === 3 && (
            <div>
              <Select
                size="small"
                name={`[${i}].option_id`}
                sx={{ width: 300, mt: 2 }}
                value={user?.options?.[0]?.option_id}
              >
                {user?.options?.map((option, j) => (
                  <MenuItem value={option?.option_id} key={j}>
                    {option?.option?.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          {questionSelected?.type_id === 4 && (
            <div className="mt-2">{user?.options?.[0]?.answer_text}</div>
          )}
        </Paper>
      ))}
    </form>
  )
}
