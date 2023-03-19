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
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface SurveyResult {
  survey: any
}

export default function SurveyResult({ survey }: SurveyResult) {
  const [isLoading, setLoading] = useState(true)
  const [answer, setAnswer] = useState([])
  const params: any = useParams()
  const { user, role } = useAuth()

  return (
    <form className="mx-auto max-w-[576px] py-4">
      <Paper sx={{ p: 2 }}>
        <h1 className="text-[28px]">{survey?.title}</h1>
        <p className="text-sm text-red-500">* Bắt buộc</p>
      </Paper>
      {survey?.questions.map((question, i) => (
        <Paper className="" sx={{ p: 2, mt: 2 }} key={i}>
          <h3>
            {question?.title}{' '}
            {question?.required ? (
              <span className="text-red-500">*</span>
            ) : null}
          </h3>
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
                    checked={false}
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
                    checked={false}
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
                sx={{ mt: 2 }}
              />
            </div>
          )}
        </Paper>
      ))}
    </form>
  )
}
