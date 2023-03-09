import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  TextField,
  Grid,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  Autocomplete,
  Box,
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { BsCircle } from 'react-icons/bs'
import * as yup from 'yup'

const validationSchema = yup.object({})

interface IQuestion {
  no: number
  title: string
  type: number
  options: {
    title: string
    no: number
  }[]
  required: boolean
}

const defaultQuestion: IQuestion = {
  no: 1,
  title: 'Tiêu đề',
  type: 1,
  required: false,
  options: [
    {
      title: '',
      no: 1,
    },
  ],
}

const initialValues = {
  title: '',
  questions: [defaultQuestion] as IQuestion[],
}

const EditDialog = ({ open, onClose, data, onSuccess }) => {
  const isUpdate = !!data?.id

  const formik = useFormik({
    initialValues: data?.id ? data : initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit(values) {
      console.log('create user with', values)
      onSuccess && onSuccess()
    },
  })

  useEffect(() => {
    formik.resetForm()
  }, [data?.id])

  console.log(formik.values)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isUpdate ? 'Sửa' : 'Thêm'} biểu mẫu khảo sát</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel>Tiêu đề</FormLabel>
              <TextField
                size="small"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
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
                      options={['Single choice', 'Multiple choice']}
                      value={
                        ['Single choice', 'Multiple choice'][
                          formik.values.questions[i]?.type
                        ]
                      }
                      onChange={(e, value) =>
                        formik.setFieldValue(
                          `questions[${i}].type`,
                          ['Single choice', 'Multiple choice'].indexOf(
                            value || '',
                          ),
                        )
                      }
                      renderInput={(props) => (
                        <TextField {...props} label="Kiểu" size="small" />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {question.options.map((option, j) => (
                    <FormControl
                      sx={{ flexDirection: 'row', alignItems: 'center', mt: 2 }}
                      fullWidth
                    >
                      <BsCircle className="mr-4" />
                      <TextField
                        size="small"
                        name={`questions[${i}].options[${j}].title`}
                        value={formik.values.questions[i]?.options?.[j]?.title}
                        onChange={formik.handleChange}
                        error={
                          !!(formik.errors as any)?.questions?.[i]?.options?.[j]
                            ?.title
                        }
                        helperText={
                          (formik.errors as any)?.questions?.[i]?.options?.[j]
                            ?.title
                        }
                        placeholder={'Tuỳ chọn ' + (j + 1)}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  formik.setFieldValue(
                                    `questions[${i}].options`,
                                    formik.values.questions[i].options.filter(
                                      (item, k) => k != j,
                                    ),
                                  )
                                }
                              >
                                <AiOutlineDelete />
                              </IconButton>
                            </InputAdornment>
                          ),
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
                          title: '',
                          no: formik.values.questions[i].options?.length + 1,
                        },
                      ])
                    }
                  >
                    Thêm Tuỳ chọn <AiOutlinePlus />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                { ...defaultQuestion },
              ])
            }
          >
            Thêm câu hỏi <AiOutlinePlus />
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button type="submit" variant="contained" startIcon={<AiOutlineEdit />}>
          {isUpdate ? 'Sửa' : 'Thêm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDialog
