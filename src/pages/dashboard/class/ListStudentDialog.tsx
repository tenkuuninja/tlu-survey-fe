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
  import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
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
    const listStudentDialog = ({open, onclose, data, onSuccess}) => {
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
    return(
        <Dialog open={open} onClose={onclose} maxWidth='lg' fullWidth>
        <DialogTitle>Danh sách sinh viên</DialogTitle>
        <DialogContent>
        
        </DialogContent>
        </Dialog>
    )
}
export default listStudentDialog