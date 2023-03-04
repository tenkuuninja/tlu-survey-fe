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
                  placeholder="Nhập họ tên của bạn"
                  fullWidth
                />
              </FormControl>
            </Grid>
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
                  placeholder="Nhập họ tên của bạn"
                  fullWidth
                />
              </FormControl>
            </Grid>
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
                  placeholder="Nhập họ tên của bạn"
                  fullWidth
                />
              </FormControl>
            </Grid>
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
                  placeholder="Nhập họ tên của bạn"
                  fullWidth
                />
              </FormControl>
            </Grid>
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
                  placeholder="Nhập họ tên của bạn"
                  fullWidth
                />
              </FormControl>
            </Grid>
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
                  placeholder="Nhập họ tên của bạn"
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
