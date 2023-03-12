import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Skeleton,
  TextField,
} from '@mui/material'
import { Link } from 'react-router-dom'
import SurveyApi from 'common/apis/class'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlus,
} from 'react-icons/ai'
import EditDialog from './EditDialog'
import ListStudentDialog from './ListStudentDialog'

const ClassDashboardPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [classes, setClasses] = useState<any[]>([])
  const [classToUpdate, setClassToUpdate] = useState<any>(null)
  const [listStudent, setListStudent] = useState<any>(null)
  const [classDeleteID, setClassDeleteID] = useState<any>(null)
  const [isOpenConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
  const [search, setSearch] = useState()
  const handleFetchClass = async() => {
    setLoading(true)
    const res = await SurveyApi.getAll()
    setClasses(res.data)
    setLoading(false)
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
      name: 'Mã lớp',
      selector: (row) => row.code,
    },
    {
      name: 'Tên lớp',
      selector: (row) => row.name,
    },
    {
      name: 'Tên môn',
      selector: (row) => row.subject_id,
    },
    {
      name: 'Giảng viên',
      selector: (row) => row.teacher_id,
    },
    {
      name: 'Trạng thái',
      selector: (row) => row.status,
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <Link to={`/survey/${row?.id}`} target="_blank">
            <IconButton size="small" color="info">
              <AiOutlineEye />
            </IconButton>
          </Link>
          <IconButton
            size="small"
            color="info"
            onClick={() => setClassToUpdate(row)}
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
        <h2 className="text-2xl font-semibold">Lớp học</h2>
        <div>
          <TextField size="small" placeholder="Tìm kiếm..." fullWidth />
        </div>
        <Button onClick={() => setClassToUpdate({})}>
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
        {!isLoading && <DataTable data={classes} columns={columns} />}
      </div>
      <ListStudentDialog
        open={!!listStudent}
        onclose={() => setListStudent(null)}
        data={listStudent}
        onSuccess={handleFetchClass}
      />
      <EditDialog
        open={!!classToUpdate}
        onClose={() => setClassToUpdate(null)}
        data={classToUpdate}
        onSuccess={handleFetchClass}
      />
      <Dialog
        open={isOpenConfirmDeleteModal}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Xác nhận xóa lớp học</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa lớp học này không??
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
  )
}

export default ClassDashboardPage
