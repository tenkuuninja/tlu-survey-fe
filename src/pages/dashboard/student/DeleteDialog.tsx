import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import StudentApi from 'common/apis/student'
import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'

const DeleteDialog = ({ open, onClose, data, onSuccess }) => {
  const [isLoading, setLoading] = useState(false)

  const handleDeleteById = async (id) => {
    setLoading(true)
    await StudentApi.deleteById(id)
    setLoading(false)
    onSuccess && onSuccess()
    onClose()
    toast.success('Xoá sinh viên thành công')
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Xác nhận xóa sinh viên</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc muốn xóa sinh viên này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          variant="contained"
          color="error"
          disabled={isLoading}
          onClick={() => handleDeleteById(data?.id)}
          startIcon={<AiOutlineDelete />}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
