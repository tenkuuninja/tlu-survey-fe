import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import DepartmentApi from 'common/apis/department'
import TeacherApi from 'common/apis/teacher'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const initialValues = {
  username: '',
  email: '',
  address: '',
  department_id: null,
  name: '',
  password_hashed: '',
  phone_number: '',
  sex: '',
  status: '',
}

const EditDialog = ({ open, onClose, data, onSuccess }) => {
  const [isLoading, setLoading] = useState(false)
  const [departments, setDepartments] = useState<any[]>([])
  const isUpdate = !!data?.id

  const validationSchema = yup.object({
    username: yup
      .string()
      .required('Tên đăng nhập không được để trống')
      .min(8, 'Tên đăng nhập phải có độ dài tối thiếu 8 ký tự'),
    email: yup
      .string()
      .required('Email không được để trống')
      .email('Email chưa đúng định dạng'),
    department_id: yup.mixed().required('Khoa không được để trống'),
    name: yup.string().required('Tên không được để trống'),
    address: yup.string().required('địa chỉ không được để trống'),
    password_hashed: isUpdate
      ? yup.string().min(8, 'Mật khẩu phải có độ dài tối thiếu 8 ký tự')
      : yup
          .string()
          .required('Mật khẩu không được để trống')
          .min(8, 'Mật khẩu phải có độ dài tối thiếu 8 ký tự'),
    phone_number: yup.string().required('Số điện thoại không được để trống'),
    sex: yup.string().required('Giới tính không được để trống'),
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
          await TeacherApi.updateById(data.id, values)
        } else {
          await TeacherApi.create(values)
        }
        onSuccess && onSuccess()
        onClose()
        toast.success((isUpdate ? 'Sửa' : 'Tạo') + ' giảng viên thành công')
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
        <DialogTitle>{isUpdate ? 'Sửa' : 'Thêm'} giảng viên</DialogTitle>
        <DialogContent>
          <Grid container spacing={[2, 2]}>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Họ tên</FormLabel>
                <TextField
                  size="small"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name}
                  placeholder="Nhập họ tên"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Email</FormLabel>
                <TextField
                  size="small"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={!!formik.errors.email}
                  helperText={formik.errors.email}
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
                <FormLabel>Số điện thoại</FormLabel>
                <TextField
                  size="small"
                  name="phone_number"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  error={!!formik.errors.phone_number}
                  helperText={formik.errors.phone_number}
                  placeholder="Nhập số điện thoại"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Tên đăng nhập</FormLabel>
                <TextField
                  size="small"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={!!formik.errors.username}
                  helperText={formik.errors.username}
                  placeholder="Nhập tên đăng nhập"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Mật khẩu</FormLabel>
                <TextField
                  size="small"
                  name="password_hashed"
                  type="password"
                  value={formik.values.password_hashed}
                  onChange={formik.handleChange}
                  error={!!formik.errors.password_hashed}
                  helperText={formik.errors.password_hashed}
                  placeholder="Nhập mật khẩu"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Địa chỉ</FormLabel>
                <TextField
                  size="small"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={!!formik.errors.address}
                  helperText={formik.errors.address}
                  placeholder="Nhập địa chỉ"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={6}></Grid>

            <Grid item md={6}>
              <FormLabel>Giới tính</FormLabel>
              <RadioGroup
                row
                name="sex"
                value={formik.values.sex}
                onChange={formik.handleChange}
              >
                <FormControlLabel value={1} control={<Radio />} label="Nam" />
                <FormControlLabel value={2} control={<Radio />} label="Nữ" />
              </RadioGroup>
              {!!formik.errors.status && (
                <FormHelperText error={true}>
                  {formik.errors.status}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={6}>
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
                  label="Đang làm việc"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Đã nghỉ việc"
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
