import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  FormLabel,
} from '@mui/material'
import AccountApi from 'common/apis/account'
import useAuth from 'common/hooks/useAuth'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const validationSchema = yup.object({
  old_password: yup
    .string()
    .required('Mật khẩu cũ không được để trống')
    .min(8, 'Bạn cần nhập tên đăng nhập dài hơn 8 kí tự'),
  new_password: yup
    .string()
    .required('Mật khẩu mới không được để trống')
    .min(8, 'Bạn cần nhập tên đăng nhập dài hơn 8 kí tự'),
})

const initialValues = {
  old_password: '',
  new_password: '',
}

const ChangePasswordDashboardPage = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    async onSubmit(values) {
      console.log('change password with', values)
      await AccountApi.changePassword(values)
      toast.success('Đổi mật khẩu thành công')
      formik.resetForm()
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
            name="old_password"
            type="password"
            value={formik.values.old_password}
            onChange={formik.handleChange}
            error={!!formik.errors.old_password}
            helperText={formik.errors.old_password}
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
            name="new_password"
            type="password"
            value={formik.values.new_password}
            onChange={formik.handleChange}
            error={!!formik.errors.new_password}
            helperText={formik.errors.new_password}
            placeholder="Nhập mật khẩu mới"
            fullWidth
          />
        </FormControl>
        <Button type="submit" className="mt-10" variant="contained">
          Xác nhận
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordDashboardPage
