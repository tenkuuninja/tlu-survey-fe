import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material'
import useAuth from 'common/hooks/useAuth'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Helmet } from 'react-helmet'

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Tên đăng nhập không được để trống')
    .min(8, 'Bạn cần nhập tên đăng nhập dài hơn 8 kí tự'),
  password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .min(8, 'Bạn cần nhập mật khẩu dài hơn 8 kí tự'),
})

const initialValues = {
  username: '',
  password: '',
  role: 'student',
}

const LoginPage = () => {
  const { login } = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit(values) {
      console.log('login with', values)
      login(values)
    },
  })

  return (
    <div className="text-neutral-800">
      <Helmet>
        <title>Đăng nhập | Trang khảo sát Đại học Thuỷ Lợi</title>
      </Helmet>
      <div className="top-1/2 left-1/2 mx-auto flex w-screen max-w-[768px] flex-wrap overflow-hidden rounded bg-white shadow-lg shadow-neutral-300 md:fixed md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="flex items-center bg-gradient-to-r from-[#67D7F5] to-[#86F7CC] md:w-[50%]">
          <img
            className="block w-full p-[36px]"
            src="/assets/login/tlu-60.png"
            alt=""
          />
        </div>
        <form
          className="px-[36px] py-[56px] md:w-[50%]"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-[18px] font-bold uppercase">Đăng nhập</h2>
          <p className="mt-1 text-[12px] text-neutral-600">
            Nhập tài khoản và mật khẩu để đăng nhập hệ thống
          </p>
          <FormControl className="mt-10" fullWidth>
            <p className="font-semibold">
              Tài khoản <span className="text-red-500">*</span>
            </p>
            <TextField
              className="mt-2"
              size="small"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={!!formik.errors.username}
              helperText={formik.errors.username}
              placeholder="Nhập tên đăng nhập của bạn"
              fullWidth
            />
          </FormControl>
          <FormControl className="mt-4" fullWidth>
            <p className="font-semibold">
              Mật khẩu <span className="text-red-500">*</span>
            </p>
            <TextField
              className="mt-2"
              size="small"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={!!formik.errors.password}
              helperText={formik.errors.password}
              placeholder="Nhập mật khẩu của bạn"
              fullWidth
            />
          </FormControl>
          <div className="mt-10 flex items-start space-x-4">
            <Select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              fullWidth
              size="small"
            >
              <MenuItem value="student">Sinh viên</MenuItem>
              <MenuItem value="teacher">Giảng viên</MenuItem>
              <MenuItem value="admin">Quản trị viên</MenuItem>
            </Select>
            <Button type="submit" className="w-[180px]" variant="contained">
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
