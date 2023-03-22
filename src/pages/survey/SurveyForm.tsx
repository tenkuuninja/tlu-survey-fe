import { Dialog } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { DialogContentText } from '@mui/material'
import { DialogActions } from '@mui/material'
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
import { toast } from 'react-toastify'

const SurveyForm = ({ survey, onSuccess }) => {
  const [isLoadingSubmmit, setLoadingSubmit] = useState(false)
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false)
  const { user } = useAuth()

  const formik = useFormik({
    initialValues: {} as any,
    validateOnChange: false,
    validateOnBlur: false,
    async onSubmit(values) {
      setLoadingSubmit(true)
      const requiredQuestionIds = survey?.questions
        ?.filter((item) => item?.required)
        ?.map((item) => item?.id)
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
      for (const qid of requiredQuestionIds) {
        if (
          !answers?.find(
            (item) =>
              (item?.option_id || item?.answer_text) &&
              item?.question_id === qid,
          )
        ) {
          setLoadingSubmit(false)
          return toast.warning('Các trường có dấu * không được để trống')
        }
      }
      try {
        console.log('form', values, answers, requiredQuestionIds)
        await SurveyApi.submitFormSurvey({
          answers,
          section: {
            user_id: user.id,
            survey_id: survey.id,
          },
        })
        toast.success('Gửi thành công')
        onSuccess && onSuccess()
      } catch (error) {
        toast.error('Đã có lỗi xảy ra')
      }
      setLoadingSubmit(false)
    },
  })

  useEffect(() => {
    if (survey?.questions?.length) {
      formik.setValues(
        survey?.questions?.map((item) => ({
          user_id: user.id,
          survey_id: survey?.id,
          question_id: item?.id || null,
          option_id: null,
          option_ids: [],
          answer_text: null,
        })),
      )
    } else {
      formik.resetForm()
    }
  }, [survey])

  if (!survey) {
    return <></>
  }

  return (
    <div className="mx-auto max-w-[576px] py-4">
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
        <Button
          disabled={isLoadingSubmmit}
          type="submit"
          variant="contained"
          onClick={() => setOpenConfirmDialog(true)}
        >
          Gửi
        </Button>
      </Box>
      <Dialog
        open={!!isOpenConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Xác nhận gửi biểu mẫu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn gửi biểu mẫu khảo sát này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Hủy</Button>
          <Button
            variant="contained"
            color="error"
            disabled={isLoadingSubmmit}
            onClick={() => formik.handleSubmit()}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SurveyForm
