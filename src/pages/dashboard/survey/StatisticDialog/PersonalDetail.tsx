import { MenuItem, Paper } from '@mui/material'
import Select from '@mui/material/Select'
import SurveyResult from 'common/components/SurveyResult'
import { useEffect, useState } from 'react'

interface PersonalDetailProps {
  survey: any
  answers: any[]
  hideAlert?: boolean
}

export default function PersonalDetail({
  survey,
  answers,
}: PersonalDetailProps) {
  const [userSelected, setUserSelected] = useState<any>(null)

  const users =
    survey?.user_surveys
      ?.filter((item) => item?.is_finish)
      ?.map((item) => item?.user) || []

  useEffect(() => {
    setUserSelected(users?.[0] || null)
  }, [survey])

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
