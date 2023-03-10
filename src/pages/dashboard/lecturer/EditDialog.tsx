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
    MenuItem,
    Select,
  } from '@mui/material'
  import { useFormik } from 'formik'
  import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
  import * as yup from 'yup'
  
  const validationSchema = yup.object({})
  
  const initialValues = {
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    sex: '',
    status: '',
  }
  const EditDialog = ({ open, onClose, data, onSuccess }) => {
    const isUpdate = !!data?.id
  
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
        <DialogTitle>{isUpdate ? 'Sửa' : 'Thêm'} Giảng viên</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
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
                    placeholder="Nhập họ tên của bạn"
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
                    placeholder="Nhập email của bạn"
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
                    placeholder="Nhập địa chỉ của bạn"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Số điện thoại</FormLabel>
                  <TextField
                    size="small"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={!!formik.errors.phoneNumber}
                    helperText={formik.errors.phoneNumber}
                    placeholder="Nhập số điện thoại của bạn"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Giới tính</FormLabel>
                  <Select
                    size="small"
                    name="sex"
                    value={formik.values.sex}
                    onChange={formik.handleChange}
                    error={!!formik.errors.sex}
                    placeholder="Nhập giới tính của bạn"
                    fullWidth
                  >
                  <MenuItem value={'male'}>Nam</MenuItem>
                  <MenuItem value={'female'}>Nữ</MenuItem>
                </Select>
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
                    placeholder="Nhập trạng thái của bạn"
                    fullWidth
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained" startIcon={isUpdate ? <AiOutlineEdit /> : <AiOutlinePlus/>}>
            {isUpdate ? 'Sửa' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  
  export default EditDialog
  