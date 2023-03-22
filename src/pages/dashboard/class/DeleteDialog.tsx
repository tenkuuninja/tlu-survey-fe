import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import ClassApi from 'common/apis/class'
import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'

const DeleteDialog = ({ open, onClose, data, onSuccess }) => {
  const [isLoading, setLoading] = useState(false)

  const handleDeleteById = async (id) => {
    try {
      setLoading(true)
      await ClassApi.deleteById(id)
      onSuccess && onSuccess()
      onClose()
      toast.success('Xoá lớp học thành công')
    } catch (error) {}
    setLoading(false)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Xác nhận xóa lớp học</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc muốn xóa lớp học này không?
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
