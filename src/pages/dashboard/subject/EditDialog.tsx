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
    IconButton,
    InputAdornment,
    Paper,
  } from '@mui/material'
  import SurveyApi from 'common/apis/subject'
  import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import { BsCircle } from 'react-icons/bs'
import { toast } from 'react-toastify'
import * as yup from 'yup'
  
  const validationSchema = yup.object({})
  
  const initialValues = {
    id :'',
    name:'',
    credit:'',
    department:'',
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
        <DialogTitle>{isUpdate ? 'Sửa' : 'Thêm'} Môn học</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={[2, 2]}>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Mã môn</FormLabel>
                  <TextField
                    size="small"
                    name="id"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    error={!!formik.errors.id}
                    helperText={formik.errors.id}
                    placeholder="Nhập mã môn của bạn"
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
                    placeholder="Nhập tên môn"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Số tín chỉ</FormLabel>
                  <TextField
                    size="small"
                    name="credit"
                    value={formik.values.credit}
                    onChange={formik.handleChange}
                    error={!!formik.errors.credit}
                    helperText={formik.errors.credit}
                    placeholder="Nhập số tín chỉ"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <FormLabel>Khoa</FormLabel>
                  <TextField
                    size="small"
                    name="department"
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
  