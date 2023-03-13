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
import SubjectApi from 'common/apis/subject'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const initialValues = {
  code: '',
  name: '',
  department_id: null,
  credit_number: '',
  description: '',
}

const EditDialog = ({ open, onClose, data, onSuccess }) => {
  const [isLoading, setLoading] = useState(false)
  const [departments, setDepartments] = useState<any[]>([])
  const isUpdate = !!data?.id

  const validationSchema = yup.object({
    code: yup.string().required('Mã môn không được để trống'),
    name: yup.string().required('Tên môn không được để trống'),
    department_id: yup.mixed().required('Khoa không được để trống'),
    credit_number: yup.string().required('Số tín chỉ không được để trống'),
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
          await SubjectApi.updateById(data.id, values)
        } else {
          await SubjectApi.create(values)
        }
        onSuccess && onSuccess()
        onClose()
        toast.success((isUpdate ? 'Sửa' : 'Tạo') + ' môn học thành công')
      } catch (error) {
        // toast.error('Đã có lỗi xảy ra')
      }
      setLoading(false)
    },
  })

  console.log(formik.values)

  useEffect(() => {
    const handleFetchDepartments = async () => {
      const res = await DepartmentApi.getAll()
      setDepartments(res.data)
    }
    handleFetchDepartments()
  }, [])

  useEffect(() => {
    formik.resetForm()
    formik.setValues(data?.id ? data : initialValues)
  }, [data])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{isUpdate ? 'Sửa' : 'Thêm'} môn học</DialogTitle>
        <DialogContent>
          <Grid container spacing={[2, 2]}>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Mã môn</FormLabel>
                <TextField
                  size="small"
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={!!formik.errors.code}
                  helperText={formik.errors.code}
                  placeholder="Nhập mã môn"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Tên môn</FormLabel>
                <TextField
                  size="small"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name}
                  placeholder="Nhập email"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Khoa</FormLabel>
                <Select
                  size="small"
                  name="department_id"
                  value={formik.values.department_id}
                  onChange={formik.handleChange}
                >
                  {departments?.map((item, i) => (
                    <MenuItem value={item?.id} key={i}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
                {!!formik.errors.department_id && (
                  <FormHelperText error={true}>
                    {formik.errors.department_id}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Số tín chỉ</FormLabel>
                <TextField
                  size="small"
                  name="credit_number"
                  type="number"
                  value={formik.values.credit_number}
                  onChange={formik.handleChange}
                  error={!!formik.errors.credit_number}
                  helperText={formik.errors.credit_number}
                  placeholder="Nhập tên đăng nhập"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Mô tả</FormLabel>
                <TextField
                  size="small"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={!!formik.errors.description}
                  helperText={formik.errors.description}
                  placeholder="Nhập địa chỉ"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={6}></Grid>
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
