import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Skeleton,
} from '@mui/material'
import SurveyApi from 'common/apis/student'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai'
import DeleteDialog from './DeleteDialog'
import EditDialog from './EditDialog'

const StudentDashboardPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [filter, setFilter] = useState<any>({})
  const [students, setStudents] = useState<any[]>([])
  const [itemToUpdate, setItemToUpdate] = useState<any>(null)
  const [itemToDelete, setItemToDelete] = useState<any>(null)

  const handleFetchStudent = async () => {
    setLoading(true)
    const res = await SurveyApi.getAll(filter)
    setStudents(res.data)
    setLoading(false)
  }
  useEffect(() => {
    handleFetchStudent()
  }, [])

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
      selector: (row) => row.department?.code,
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
      selector: (row) => row.phone_number,
    },
    {
      name: 'Giới tính',
      selector: (row) => (row.sex === 1 ? 'Nam' : 'Nữ'),
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <Tooltip arrow title="Sửa" placement="top">
            <IconButton
              size="small"
              color="info"
              onClick={() => setItemToUpdate(row)}
            >
              <AiOutlineEdit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Xoá" placement="top">
            <IconButton
              size="small"
              color="error"
              onClick={() => setItemToDelete(row)}
            >
              <AiOutlineDelete />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ]

  return (
    <div className="min-h-[600px] rounded-md border border-neutral-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sinh viên</h2>
        <Button onClick={() => setItemToUpdate({})}>
          <AiOutlinePlus /> Thêm
        </Button>
      </div>
      <div className="mt-4 flex items-center justify-end">
        <TextField
          size="small"
          value={filter?.search || ''}
          onChange={(e) => setFilter({ search: e.target.value })}
          fullWidth
          placeholder="Tìm kiếm"
          sx={{ maxWidth: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip arrow title="Tìm kiếm" placement="top">
                  <IconButton onClick={handleFetchStudent}>
                    <AiOutlineSearch />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="mt-10">
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
        open={!!itemToUpdate}
        onClose={() => setItemToUpdate(null)}
        data={itemToUpdate}
        onSuccess={handleFetchStudent}
      />
      <DeleteDialog
        open={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        data={itemToDelete}
        onSuccess={handleFetchStudent}
      />
    </div>
  )
}

export default StudentDashboardPage
