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
  import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'
  import * as yup from 'yup'
  
  const validationSchema = yup.object({})
  
  const initialValues = {
    name: '',
    startday: '',
    endday: '',
    lecture: '',
    subject: '',
    department: '',
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
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <TextField
                    size="small"
                    name="email"
                    value={formik.values.startday}
                    onChange={formik.handleChange}
                    error={!!formik.errors.startday}
                    helperText={formik.errors.startday}
                    placeholder="Nhập ngày bắt đầu"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <TextField
                    size="small"
                    name="address"
                    value={formik.values.endday}
                    onChange={formik.handleChange}
                    error={!!formik.errors.endday}
                    helperText={formik.errors.endday}
                    placeholder="Nhập ngày kết thúc"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Giảng viên</FormLabel>
                  <TextField
                    size="small"
                    name="phoneNumber"
                    value={formik.values.lecture}
                    onChange={formik.handleChange}
                    error={!!formik.errors.lecture}
                    helperText={formik.errors.lecture}
                    placeholder="Nhập ngày kết thúc"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Tên môn</FormLabel>
                  <TextField
                    size="small"
                    name="sex"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={!!formik.errors.subject}
                    placeholder="Nhập tên môn học"
                    fullWidth
                  >
                </TextField>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Tên khoa</FormLabel>
                  <TextField
                    size="small"
                    name="status"
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    error={!!formik.errors.department}
                    helperText={formik.errors.department}
                    placeholder="Nhập khoa"
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
  