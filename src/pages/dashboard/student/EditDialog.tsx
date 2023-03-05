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
} from '@mui/material'
import { useFormik } from 'formik'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import * as yup from 'yup'

const validationSchema = yup.object({})

const initialValues = {
  username: '',
  email: '',
  phone: '',
  sex: '',
  role: '',
  status: '',
}

const EditDialog = ({ open, onClose, data, onSuccess }) => {
  const isUpdate = !!data

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit(values) {
      console.log('create user with', values)
      onSuccess && onSuccess()
    },
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isUpdate ? 'Sửa' : 'Thêm'} sinh viên</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={[2, 2]}>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Họ tên</FormLabel>
                <TextField
                  size="small"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={!!formik.errors.username}
                  helperText={formik.errors.username}
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
                <FormLabel>Số điện thoại</FormLabel>
                <TextField
                  size="small"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={!!formik.errors.phone}
                  helperText={formik.errors.phone}
                  placeholder="Nhập số điện thoại"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Giới tính</FormLabel>
                <TextField
                  size="small"
                  name="sex"
                  value={formik.values.sex}
                  onChange={formik.handleChange}
                  error={!!formik.errors.sex}
                  helperText={formik.errors.sex}
                  placeholder="Nhập giới tính"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Vai trò</FormLabel>
                <TextField
                  size="small"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  error={!!formik.errors.role}
                  helperText={formik.errors.role}
                  placeholder="Nhập vai trò"
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <FormLabel>Trạng thái</FormLabel>
                <TextField
                  size="small"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={!!formik.errors.status}
                  helperText={formik.errors.status}
                  placeholder="Nhập trạng thái"
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
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
