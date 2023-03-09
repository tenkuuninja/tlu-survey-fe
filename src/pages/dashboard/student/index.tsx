import { 
IconButton, 
Button, 
Dialog, 
DialogTitle, 
DialogContent,
DialogContentText,
DialogActions } from '@mui/material'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import EditDialog from './EditDialog'


const fakes = [...new Array(10)].map((item, i) => ({
  id: i + 1,
  role: 'admin',
  username: 'hoangdz',
  email: 'chuatebongtoi@gmail.com',
  name: 'Nguyễn Việt Hoàng',
  address: 'Đông Anh',
  phoneNumber: '0969696969696',
  sex: 'male',
  status: 1,
}))

const StudentDashboardPage = () => {
  const [students, setStudents] = useState<any[]>([])
  const [studentToUpdate, setStudentToUpdate] = useState<any>(null)
  const [studentDeleteID, setStudentDeleteID] = useState<any>(null)
  const [isOpenConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)

  const handleFetchStudent = () => {
    setStudents(fakes)
  }

  useEffect(() => {
    handleFetchStudent()
  }, [])

  const handleClose = () =>{
    setOpenConfirmDeleteModal(false);
  }

  const handleClickDelete = (id) =>{
    setStudentDeleteID(id);
    setOpenConfirmDeleteModal(true);
  };

  const handleDeleteStudent = () => {
    setStudents((pre) => {
      const newArray = [...pre];
      return newArray.filter((students)=> students.id!==studentDeleteID );
    });
    setOpenConfirmDeleteModal(false);
  }
  const columns = [
    {
      name: '#',
      selector: (row) => row.id,
    },
    {
      name: 'Tên đăng nhập',
      selector: (row) => row.username,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Địa chỉ',
      selector: (row) => row.address,
    },
    {
      name: 'Số điện thoại',
      selector: (row) => row.phoneNumber,
    },
    {
      name: 'Giới tính',
      selector: (row) => row.sex,
    },
    {
      name: 'Vai trò',
      selector: (row) => row.role,
    },
    {
      name: 'Trạng thái',
      selector: (row) => (row.status === 1 ? 'Đã nghỉ học' : 'Chưa nghỉ học'),
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <IconButton
            size="small"
            color="info"
            onClick={() => setStudentToUpdate(row)}
          >
            <AiOutlineEdit />
          </IconButton>
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

  return (
    <div className="min-h-[600px] rounded-md border border-neutral-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sinh viên</h2>
        <Button onClick={() => setStudentToUpdate({})}>
          <AiOutlinePlus /> Thêm
        </Button>
      </div>
      <div>
        <DataTable data={students} columns={columns} />
      </div>
      <EditDialog
        open={!!studentToUpdate}
        onClose={() => setStudentToUpdate(null)}
        data={studentToUpdate}
        onSuccess={handleFetchStudent}
      />
      <Dialog open={isOpenConfirmDeleteModal} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Xác nhận xóa sinh viên</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có chắc muốn xóa sinh viên này không??
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteStudent}
          startIcon={<AiOutlineDelete />}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default StudentDashboardPage
