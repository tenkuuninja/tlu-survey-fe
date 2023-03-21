import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import SubjectApi from 'common/apis/subject'
import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'

const DeleteDialog = ({ open, onClose, data, onSuccess }) => {
  const [isLoading, setLoading] = useState(false)

  const handleDeleteById = async (id) => {
    setLoading(true)
    await SubjectApi.deleteById(id)
    setLoading(false)
    onSuccess && onSuccess()
    onClose()
    toast.success('Xoá môn học thành công')
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Xác nhận xóa môn học</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc muốn xóa môn học này không?
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
