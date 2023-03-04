import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  FormLabel,
} from '@mui/material'
import useAuth from 'common/hooks/useAuth'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required('Mật khẩu cũ không được để trống')
    .min(8, 'Bạn cần nhập tên đăng nhập dài hơn 8 kí tự'),
  newPassword: yup
    .string()
    .required('Mật khẩu mới không được để trống')
    .min(8, 'Bạn cần nhập tên đăng nhập dài hơn 8 kí tự'),
})

const initialValues = {
  oldPassword: '',
  newPassword: '',
}

const ChangePasswordDashboardPage = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit(values) {
      console.log('change password with', values)
    },
  })

  return (
    <div className="min-h-[600px] rounded-md border border-neutral-100 bg-white p-4">
      <h2 className="text-2xl font-semibold">Đổi mật khẩu</h2>
      <form className="max-w-[400px]" onSubmit={formik.handleSubmit}>
        <FormControl className="mt-10" fullWidth>
          <FormLabel>
            Mật khẩu hiện tại <span className="text-red-500">*</span>
          </FormLabel>
          <TextField
            className="mt-2"
            size="small"
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={!!formik.errors.oldPassword}
            helperText={formik.errors.oldPassword}
            placeholder="Nhập mật khẩu hiện tại"
            fullWidth
          />
        </FormControl>
        <FormControl className="mt-4" fullWidth>
          <FormLabel>
            Mật khẩu mới <span className="text-red-500">*</span>
          </FormLabel>
          <TextField
            className="mt-2"
            size="small"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={!!formik.errors.newPassword}
            helperText={formik.errors.newPassword}
            placeholder="Nhập mật khẩu mới"
            fullWidth
          />
        </FormControl>
        <Button type='submit' className="mt-10" variant="contained">
          Xác nhận
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordDashboardPage
