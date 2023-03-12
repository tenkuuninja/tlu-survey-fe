import { 
IconButton, 
Button, 
Dialog, 
DialogTitle, 
DialogContent,
DialogContentText,
DialogActions,
Skeleton } from '@mui/material'
import SurveyApi from 'common/apis/student'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import EditDialog from './EditDialog'

const StudentDashboardPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [students, setStudents] = useState<any[]>([])
  const [studentToUpdate, setStudentToUpdate] = useState<any>(null)
  const [studentDeleteID, setStudentDeleteID] = useState<any>(null)
  const [isOpenConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)

  const handleFetchStudent = async() => {
    setLoading(true)
    const res = await SurveyApi.getAll()
    setStudents(res.data)
    setLoading(false)
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
      name: 'Mã sinh viên',
      selector: (row) => row.id,
    },
    {
      name: 'Họ tên',
      selector: (row) => row.name,
    },
    {
      name: 'Thuộc khoa',
      selector: (row) => row.department_id,
    },
    {
      name: 'Tên đăng nhập',
      selector: (row) => row.username,
    },
    {
      name: 'Mật khẩu',
      selector: (row) => row.password_hashed,
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
      selector: (row) => row.phone_number,
    },
    {
      name: 'Giới tính',
      selector: (row) => row.sex,
    },
    {
      name: 'Vai trò',
      selector: (row) => row.status,
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
      {isLoading && (
          <>
            {[...new Array(10)].map((item, i) => (
              <Skeleton
                variant="rectangular"
                height={32}
                sx={{ mt: 2 }}
                key={i}
              />
            ))}
          </>
        )}
        {!isLoading && <DataTable data={students} columns={columns} />}
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
