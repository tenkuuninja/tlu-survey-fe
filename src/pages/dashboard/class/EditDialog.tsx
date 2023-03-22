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
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import DepartmentApi from 'common/apis/department'
import ClassApi from 'common/apis/class'
import SubjectApi from 'common/apis/subject'
import TeacherApi from 'common/apis/teacher'
import GradeApi from 'common/apis/grade'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const initialValues = {
  code: '',
  name: '',
  subject_id: '',
  teacher_id: '',
  grade_level_id: '',
  status: '',
}
const EditDialog = ({ open, onClose, data, onSuccess }) => {
  const [isLoading, setLoading] = useState(false)
  const [subjects, setSubjects] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [grades, setGrades] = useState<any[]>([])
  const isUpdate = !!data?.id

  const validationSchema = yup.object({
    code: yup.string().required('Mã lớp không được để trống'),
    name: yup.string().required('Tên không được để trống'),
    subject_id: yup.string().required('Mã môn không được để trống'),
    teacher_id: yup.string().required('Mã giảng viên không được để trống'),
    status: yup.string().required('Trạng thái không được để trống'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    async onSubmit(values) {
      setLoading(true)
      try {
        if (isUpdate) {
          await ClassApi.updateById(data.id, values)
        } else {
          await ClassApi.create(values)
        }
        onSuccess && onSuccess()
        onClose()
        toast.success((isUpdate ? 'Sửa' : 'Tạo') + ' lớp học thành công')
      } catch (error) {
        // toast.error('Đã có lỗi xảy ra')
      }
      setLoading(false)
    },
  })

  console.log(formik.values)

  useEffect(() => {
    const handleFetchSubject = async () => {
      const res = await SubjectApi.getAll()
      setSubjects(res.data)
    }
    handleFetchSubject()
  }, [])

  useEffect(() => {
    const handleFetchTeacher = async () => {
      const res = await TeacherApi.getAll()
      setTeachers(res.data)
    }
    handleFetchTeacher()
  }, [])

  useEffect(() => {
    const handleFetchGrade = async () => {
      const res = await GradeApi.getAll()
      setGrades(res.data)
    }
    handleFetchGrade()
  }, [])

  useEffect(() => {
    formik.resetForm()
    formik.setValues(data?.id ? data : initialValues)
  }, [data])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{isUpdate ? 'Sửa' : 'Thêm'} lớp học</DialogTitle>
        <DialogContent>
          <Grid container spacing={[2, 2]}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>Mã lớp</FormLabel>
                <TextField
                  size="small"
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={!!formik.errors.code}
                  helperText={formik.errors.code}
                  placeholder="Nhập mã lớp"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>Tên lớp</FormLabel>
                <TextField
                  size="small"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name}
                  placeholder="Nhập tên lớp"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>Môn học</FormLabel>
                <Select
                  size="small"
                  name="subject_id"
                  value={formik.values.subject_id}
                  onChange={formik.handleChange}
                >
                  {subjects?.map((item, i) => (
                    <MenuItem value={item?.id} key={i}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
                {!!formik.errors.subject_id && (
                  <FormHelperText error={true}>
                    {formik.errors.subject_id}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>Giảng viên</FormLabel>
                <Select
                  size="small"
                  name="teacher_id"
                  value={formik.values.teacher_id}
                  onChange={formik.handleChange}
                >
                  {teachers?.map((item, i) => (
                    <MenuItem value={item?.id} key={i}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
                {!!formik.errors.teacher_id && (
                  <FormHelperText error={true}>
                    {formik.errors.teacher_id}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>Thuộc khóa</FormLabel>
                <Select
                  size="small"
                  name="grade_level_id"
                  value={formik.values.grade_level_id}
                  onChange={formik.handleChange}
                >
                  {grades?.map((item, i) => (
                    <MenuItem value={item?.id} key={i}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
                {!!formik.errors.grade_level_id && (
                  <FormHelperText error={true}>
                    {formik.errors.grade_level_id}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>Trạng thái</FormLabel>
              <RadioGroup
                row
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Chưa mở"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Đang mở"
                />
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label="Đã đóng"
                />
              </RadioGroup>
              {!!formik.errors.status && (
                <FormHelperText error={true}>
                  {formik.errors.status}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            startIcon={isUpdate ? <AiOutlineEdit /> : <AiOutlinePlus />}
          >
            {isUpdate ? 'Sửa' : 'Thêm'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditDialog
