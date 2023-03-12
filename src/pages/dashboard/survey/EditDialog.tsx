import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material'
import SurveyApi from 'common/apis/survey'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { BsCircle } from 'react-icons/bs'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const validationSchema = yup.object({
  title: yup.string().required('Tên khảo sát không được để trống'),
  questions: yup.array().of(
    yup.object({
      type_id: yup.number().required('Loại câu hỏi không được để trống'),
      title: yup.string().required('Tiêu đề câu hỏi không được để trống'),
      options: yup.array().of(
        yup.object({
          title: yup.string().required('Tuỳ chọn không được để trống'),
        }),
      ),
    }),
  ),
})

const questionTypes = [
  {
    id: 1,
    code: '',
    name: 'Trắc nghiệm',
  },
  {
    id: 2,
    code: '',
    name: 'Hộp chọn',
  },
  {
    id: 3,
    code: '',
    name: 'Thả xuống',
  },
  {
    id: 4,
    code: '',
    name: 'Văn bản',
  },
]

interface IQuestion {
  no: number
  title: string
  type_id: number
  options: {
    title: string
    no: number
  }[]
  required: boolean
}

const defaultQuestion: IQuestion = {
  no: 1,
  title: 'Câu hỏi 1',
  type_id: 1,
  required: false,
  options: [
    {
      title: 'Tuỳ chọn 1',
      no: 1,
    },
  ],
}

const initialValues = {
  title: 'Biểu mẫu chưa có tiều đề',
  questions: [defaultQuestion] as IQuestion[],
}

const EditDialog = ({ open, onClose, data, onSuccess }) => {
  const [isLoading, setLoading] = useState(false)
  const isUpdate = !!data?.id

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    async onSubmit(values) {
      setLoading(true)
      try {
        if (isUpdate) {
          await SurveyApi.updateById(data.id, values)
        } else {
          await SurveyApi.create(values)
        }
        onSuccess && onSuccess()
        onClose()
        toast.success((isUpdate ? 'Sửa' : 'Tạo') + ' khảo sát thành công')
      } catch (error) {
        toast.error('Đã có lỗi xảy ra')
      }
      setLoading(false)
    },
  })

  useEffect(() => {
    formik.resetForm()
    formik.setValues(data?.id ? data : initialValues)
  }, [data?.id])

  console.log(formik.values)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{isUpdate ? 'Sửa' : 'Thêm'} biểu mẫu khảo sát</DialogTitle>
        <DialogContent>
          <div>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel>Tiêu đề</FormLabel>
              <TextField
                size="small"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                error={!!formik.errors?.title}
                helperText={(formik.errors as any)?.title}
                placeholder="Nhập tiêu đề"
                fullWidth
              />
            </FormControl>
          </div>
          {formik.values.questions.map((question, i) => (
            <Paper sx={{ mt: 2, p: 2 }} elevation={2}>
              <Grid container spacing={[2, 2]}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`questions[${i}].title`}
                      value={formik.values.questions[i].title}
                      onChange={formik.handleChange}
                      onFocus={(e) => e.target.select()}
                      error={!!(formik.errors as any)?.questions?.[i]?.title}
                      helperText={(formik.errors as any)?.questions?.[i]?.title}
                      label="Tiêu đề"
                      placeholder="Nhập tiêu đề"
                      variant="standard"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={questionTypes}
                      getOptionLabel={(option) => option?.name}
                      isOptionEqualToValue={(option, value) =>
                        option?.id === value?.id
                      }
                      value={
                        questionTypes?.[
                          formik.values.questions[i]?.type_id - 1 || 0
                        ]
                      }
                      onChange={(e, value) =>
                        formik.setFieldValue(
                          `questions[${i}].type_id`,
                          value?.id,
                        )
                      }
                      renderInput={(props) => (
                        <TextField {...props} label="Kiểu" size="small" />
                      )}
                    />
                  </FormControl>
                </Grid>
                {question?.type_id !== 4 && (
                  <>
                    <Grid item xs={12}>
                      {question.options.map((option, j) => (
                        <FormControl
                          sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            mt: 2,
                          }}
                          fullWidth
                        >
                          <BsCircle className="mr-4" />
                          <TextField
                            size="small"
                            name={`questions[${i}].options[${j}].title`}
                            value={
                              formik.values.questions[i]?.options?.[j]?.title
                            }
                            onChange={formik.handleChange}
                            onFocus={(e) => e.target.select()}
                            error={
                              !!(formik.errors as any)?.questions?.[i]
                                ?.options?.[j]?.title
                            }
                            helperText={
                              (formik.errors as any)?.questions?.[i]?.options?.[
                                j
                              ]?.title
                            }
                            placeholder={'Tuỳ chọn ' + (j + 1)}
                            variant="standard"
                            fullWidth
                            InputProps={{
                              endAdornment:
                                question.options?.length > 1 ? (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() =>
                                        formik.setFieldValue(
                                          `questions[${i}].options`,
                                          formik.values.questions[
                                            i
                                          ].options.filter((item, k) => k != j),
                                        )
                                      }
                                    >
                                      <AiOutlineDelete />
                                    </IconButton>
                                  </InputAdornment>
                                ) : null,
                            }}
                          />
                        </FormControl>
                      ))}
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          formik.setFieldValue(`questions[${i}].options`, [
                            ...formik.values.questions[i].options,
                            {
                              title:
                                'Tuỳ chọn ' +
                                (formik.values.questions[i].options?.length +
                                  1),
                              no:
                                formik.values.questions[i].options?.length + 1,
                            },
                          ])
                        }
                      >
                        Thêm Tuỳ chọn <AiOutlinePlus />
                      </Button>
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <FormControlLabel
                      checked={formik.values.questions[i]?.required}
                      onChange={(e, checked) =>
                        formik.setFieldValue(
                          `questions[${i}].required`,
                          checked,
                        )
                      }
                      control={<Switch defaultChecked />}
                      label="Bắt buộc"
                    />
                    {formik.values.questions?.length > 1 ? (
                      <IconButton
                        onClick={() =>
                          formik.setFieldValue(
                            `questions`,
                            formik.values.questions.filter((item, k) => k != i),
                          )
                        }
                      >
                        <AiOutlineDelete />
                      </IconButton>
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() =>
              formik.setFieldValue('questions', [
                ...formik.values.questions,
                {
                  ...defaultQuestion,
                  title: 'Câu hỏi ' + (formik.values.questions?.length + 1),
                },
              ])
            }
          >
            Thêm câu hỏi <AiOutlinePlus />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={<AiOutlineEdit />}
          >
            {isUpdate ? 'Sửa' : 'Thêm'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditDialog
