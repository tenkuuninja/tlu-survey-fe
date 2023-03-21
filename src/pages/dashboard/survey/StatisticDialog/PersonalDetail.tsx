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
import SurveyResult from 'common/components/SurveyResult'
import useAuth from 'common/hooks/useAuth'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface PersonalDetailProps {
  survey: any
  answers: any[]
  hideAlert?: boolean
}

export default function PersonalDetail({
  survey,
  answers,
  hideAlert = false,
}: PersonalDetailProps) {
  const [userSelected, setUserSelected] = useState<any>(null)
  const params: any = useParams()
  const { user, role } = useAuth()

  const users =
    survey?.user_surveys
      ?.filter((item) => item?.is_finish)
      ?.map((item) => item?.user) || []

  useEffect(() => {
    setUserSelected(users?.[0] || null)
  }, [users])

  return (
    <form className="mx-auto max-w-[576px] py-4">
      <Paper sx={{ p: 2 }}>
        <h1 className="mb-[20px] text-[28px]">{survey?.title}</h1>
        <Select
          value={+userSelected?.id}
          size="small"
          onChange={(e) =>
            setUserSelected(
              users?.find((item) => +item?.id === +e.target.value),
            )
          }
          sx={{ width: 300 }}
        >
          {users?.map((user, i) => (
            <MenuItem value={+user?.id} key={i}>
              {user?.name}
            </MenuItem>
          ))}
        </Select>
      </Paper>
      <SurveyResult
        survey={survey}
        answers={answers?.filter(
          (item) => +item?.user_id === +userSelected?.id,
        )}
        hideHeader
      />
    </form>
  )
}
