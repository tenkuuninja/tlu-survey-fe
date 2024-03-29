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
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import DepartmentApi from 'common/apis/department'
import GradeApi from 'common/apis/grade'
import StudentApi from 'common/apis/student'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus,
} from 'react-icons/ai'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const initialValues = {
  code: '',
  username: '',
  citizen_id: '',
  address: '',
  department_id: null,
  grade_level_id: '',
  name: '',
  password: '',
  phone_number: '',
  sex: '',
  status: 1,
}

const EditDialog = ({ open, onClose, data, onSuccess }) => {
  const [isLoading, setLoading] = useState(false)
  const [iShowPassword, setShowPassword] = useState(false)
  const [departments, setDepartments] = useState<any[]>([])
  const [grades, setGrades] = useState<any[]>([])
  const isUpdate = !!data?.id

  const validationSchema = yup.object({
    code: yup.string().required('Mã sinh viên không được để trống'),
    username: yup
      .string()
      .required('Tên đăng nhập không được để trống')
      .min(8, 'Tên đăng nhập phải có độ dài tối thiếu 8 ký tự'),
    citizen_id: yup
      .string()
      .required('Căn cước công dân không được để trống')
      .matches(/^\d+$/g, 'Căn cước công dân phải là số'),
    department_id: yup.mixed().required('Khoa không được để trống'),
    grade_level_id: yup.mixed().required('Khoá không được để trống'),
    name: yup.string().required('Tên không được để trống'),
    address: yup.string().required('địa chỉ không được để trống'),
    password: isUpdate
      ? yup.string().min(8, 'Mật khẩu phải có độ dài tối thiếu 8 ký tự')
      : yup
          .string()
          .required('Mật khẩu không được để trống')
          .min(8, 'Mật khẩu phải có độ dài tối thiếu 8 ký tự'),
    phone_number: yup
      .string()
      .required('Số điện thoại không được để trống')
      .matches(
        /^(84|0[3|5|7|8|9])+([0-9]{8})$/g,
        'Số điện thoại chưa đúng định dạng',
      ),
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
          await StudentApi.updateById(data.id, values)
        } else {
          await StudentApi.create(values)
        }
        onSuccess && onSuccess()
        onClose()
        toast.success((isUpdate ? 'Sửa' : 'Tạo') + ' sinh viên thành công')
      } catch (error) {
        // toast.error('Đã có lỗi xảy ra')
      }
      setLoading(false)
    },
  })

  useEffect(() => {
    const handleFetchDepartments = async () => {
      const res = await DepartmentApi.getAll()
      setDepartments(res.data)
    }
    handleFetchDepartments()
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
    if (data?.id) {
      formik.setValues(data)
    }
    setShowPassword(false)
  }, [data])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{isUpdate ? 'Sửa' : 'Thêm'} sinh viên</DialogTitle>
        <DialogContent>
          <Grid container spacing={[2, 2]}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>Căn cước công dân</FormLabel>
                <TextField
                  size="small"
                  name="citizen_id"
                  value={formik.values.citizen_id}
                  onChange={formik.handleChange}
                  error={!!formik.errors.citizen_id}
                  helperText={formik.errors.citizen_id}
                  placeholder="Nhập mã căn cước"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>Khoa</FormLabel>
                <Select
                  size="small"
                  name="department_id"
                  disabled={isUpdate}
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
              <FormControl fullWidth>
                <FormLabel>Mã sinh viên</FormLabel>
                <TextField
                  size="small"
                  name="code"
                  disabled={isUpdate}
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={!!formik.errors.code}
                  helperText={formik.errors.code}
                  placeholder="Nhập mã sinh viên"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}></Grid>

            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>Mật khẩu</FormLabel>
                <TextField
                  size="small"
                  name="password"
                  type={iShowPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={!!formik.errors.password}
                  helperText={formik.errors.password}
                  placeholder={'Nhập mật khẩu' + (isUpdate ? ' mới' : '')}
                  fullWidth
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!iShowPassword)}
                        >
                          {iShowPassword ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
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
              {!!formik.errors.sex && (
                <FormHelperText error={true}>
                  {formik.errors.sex}
                </FormHelperText>
              )}
            </Grid>

            {isUpdate && (
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
                    label="Đang học"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Thôi học"
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label="Ra trường"
                  />
                </RadioGroup>
                {!!formik.errors.status && (
                  <FormHelperText error={true}>
                    {formik.errors.status}
                  </FormHelperText>
                )}
              </Grid>
            )}
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
