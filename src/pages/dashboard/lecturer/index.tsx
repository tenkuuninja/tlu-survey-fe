import {
  Button,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  Tooltip,
} from '@mui/material'
import TeacherApi from 'common/apis/teacher'
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
import { Helmet } from 'react-helmet'

const TeacherDashboardPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [filter, setFilter] = useState<any>({})
  const [teachers, setTeachers] = useState<any[]>([])
  const [itemToUpdate, setItemToUpdate] = useState<any>(null)
  const [itemToDelete, setItemToDelete] = useState<any>(null)

  const handleFetchTeacher = async () => {
    setLoading(true)
    const res = await TeacherApi.getAll(filter)
    setTeachers(res.data)
    setLoading(false)
  }
  useEffect(() => {
    handleFetchTeacher()
  }, [])

  const columns = [
    {
      name: 'Mã giảng viên',
      selector: (row) => row.code,
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
      name: 'Số căn cước',
      selector: (row) => row.citizen_id,
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
      <Helmet>
        <title>Quản lý giảng viên | Trang khảo sát Đại học Thuỷ Lợi</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Giảng viên</h2>
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
                  <IconButton onClick={handleFetchTeacher}>
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
        {!isLoading && <DataTable dense data={teachers} columns={columns} />}
      </div>
      <EditDialog
        open={!!itemToUpdate}
        onClose={() => setItemToUpdate(null)}
        data={itemToUpdate}
        onSuccess={handleFetchTeacher}
      />
      <DeleteDialog
        open={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        data={itemToDelete}
        onSuccess={handleFetchTeacher}
      />
    </div>
  )
}

export default TeacherDashboardPage
