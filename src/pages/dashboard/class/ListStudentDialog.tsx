import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import DataTable from 'react-data-table-component'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlinePlus,
} from 'react-icons/ai'
import * as yup from 'yup'

const validationSchema = yup.object({})
const fakesgv = [...new Array(10)].map((item, i) => ({
  id: i + 1,
  name: 'long' + i,
  sex: 'male',
  department: 'CNTT',
}))

const initialValues = {
  id: '',
  name: '',
  sex: '',
  department: '',
}

const listStudentDialog = ({ open, onclose, data, onSuccess }) => {
  const [classes, setClasses] = useState<any[]>([])
  const [classDeleteID, setClassDeleteID] = useState<any>(null)
  const [isOpenConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)

  const handleFetchClass = () => {
    setClasses(fakesgv)
  }
  useEffect(() => {
    handleFetchClass()
  }, [])
  const handleClose = () => {
    setOpenConfirmDeleteModal(false)
  }

  const handleClickDelete = (id) => {
    setClassDeleteID(id)
    setOpenConfirmDeleteModal(true)
  }

  const handleDeleteClass = () => {
    setClasses((pre) => {
      const newArray = [...pre]
      return newArray.filter((classes) => classes.id !== classDeleteID)
    })
    setOpenConfirmDeleteModal(false)
  }
  const columns = [
    {
      name: 'Mã sinh viên',
      selector: (row) => row.id,
    },
    {
      name: 'Tên',
      selector: (row) => row.name,
    },
    {
      name: 'Giới tính',
      selector: (row) => row.sex,
    },
    {
      name: 'Khoa',
      selector: (row) => row.department,
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleClickDelete(row.id)}
          >
            <AiOutlineDelete />
          </IconButton>
        </>
      ),
    },
  ]

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
    <Dialog open={open} onClose={onclose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Danh sách sinh viên</h2>
          <Button>
            <AiOutlinePlus /> Thêm
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        <div>
          <DataTable data={classes} columns={columns} />
          <Dialog
            open={isOpenConfirmDeleteModal}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>Xác nhận xóa lớp học</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có chắc muốn xóa sinh viên này khỏi lớp học này không??
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClass}
                startIcon={<AiOutlineDelete />}
              >
                Xóa
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default listStudentDialog
