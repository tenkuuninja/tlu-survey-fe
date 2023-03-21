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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Summary {
  survey: any
  answers: any[]
  hideAlert?: boolean
}

export default function Summary({
  survey,
  answers,
  hideAlert = false,
}: Summary) {
  const [isLoading, setLoading] = useState(true)
  const params: any = useParams()
  const { user, role } = useAuth()

  console.log('stat', survey, answers)

  const answerObj = useMemo(
    () =>
      answers.reduce((acc, cur) => {
        if (!acc[cur.question_id]) {
          acc[cur.question_id] = []
        }
        acc[cur.question_id].push(cur)
        return acc
      }, {}),
    [answers],
  )
  console.log('answerObj', answerObj)

  return (
    <form className="mx-auto max-w-[576px] py-4">
      <Paper sx={{ p: 2 }}>
        <h1 className="text-[28px]">{survey?.title}</h1>
        {!hideAlert && (
          <p className="mt-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-600">
            Câu trả lời của bạn đã được ghi lại.
          </p>
        )}
      </Paper>
      {survey?.questions.map((question, i) => (
        <Paper className="" sx={{ p: 2, mt: 2 }} key={i}>
          <h3>{question?.title} </h3>
          {question?.type_id === 1 && (
            <div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name={`[${i}].option_id`}
              >
                {question?.options?.map((option, j) => (
                  <FormControlLabel
                    value={option.id}
                    control={<Radio />}
                    label={option?.title}
                    checked={
                      !!answerObj?.[question?.id]?.find(
                        (item) => item.option_id === option.id,
                      )
                    }
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
                      !!answerObj?.[question?.id]?.find(
                        (item) => item.option_id === option.id,
                      )
                    }
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
                sx={{ width: 300, mt: 2 }}
                value={answerObj?.[question?.id]?.[0]?.option_id}
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
                value={answerObj?.[question?.id]?.[0]?.answer_text}
                name={`[${i}].answer_text`}
                sx={{ mt: 2 }}
              />
            </div>
          )}
        </Paper>
      ))}
    </form>
  )
}
