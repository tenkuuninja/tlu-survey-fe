import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Tooltip,
} from '@mui/material'
import DepartmentApi from 'common/apis/department'
import StudentApi from 'common/apis/student'
import useAuth from 'common/hooks/useAuth'
import { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai'
import DeleteDialog from './DeleteDialog'
import EditDialog from './EditDialog'

const StudentDashboardPage = () => {
  const { role } = useAuth()
  const [departments, setDepartments] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState<any>('')
  const [filter, setFilter] = useState<any>({ department: '0' })
  const [students, setStudents] = useState<any[]>([])
  const [itemToUpdate, setItemToUpdate] = useState<any>(null)
  const [itemToDelete, setItemToDelete] = useState<any>(null)

  const handleFetchStudent = async () => {
    setLoading(true)
    const params = { ...filter }
    if (+params.department === 0) {
      delete params.department
    }
    const res = await StudentApi.getAll(params)
    setStudents(res.data)
    setLoading(false)
  }

  useEffect(() => {
    handleFetchStudent()
  }, [filter])

  useEffect(() => {
    const handleFetchDepartment = async () => {
      const res = await DepartmentApi.getAll()
      setDepartments(res.data)
    }
    handleFetchDepartment()
  }, [])

  const columns: TableColumn<any>[] = [
    {
      name: 'Mã sinh viên',
      cell: (row) => row.code,
    },
    {
      name: 'Họ tên',
      cell: (row) => row.name,
      minWidth: '200px',
    },
    {
      name: 'Thuộc khoa',
      cell: (row) => row.department?.code,
    },
    {
      name: 'Tên đăng nhập',
      cell: (row) => row.username,
    },
    {
      name: 'Email',
      cell: (row) => row.email,
      minWidth: '200px',
    },
    {
      name: 'Địa chỉ',
      cell: (row) => row.address,
    },
    {
      name: 'Số điện thoại',
      cell: (row) => row.phone_number,
    },
    {
      name: 'Giới tính',
      width: '100px',
      center: true,
      cell: (row) => (row.sex === 1 ? 'Nam' : 'Nữ'),
    },
    {
      name: 'Hành động',
      right: true,
      cell: (row) => (
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
        {role === 'admin' && (
          <Button onClick={() => setItemToUpdate({})}>
            <AiOutlinePlus /> Thêm
          </Button>
        )}
      </div>
      {role === 'admin' && (
        <div className="mt-4 flex items-center justify-end gap-4">
          <Select
            size="small"
            value={filter.department}
            onChange={(e) =>
              setFilter({ ...filter, department: e.target.value })
            }
            fullWidth
            sx={{ maxWidth: 300 }}
          >
            <MenuItem value="0">-- Tất cả khoa --</MenuItem>
            {departments?.map((item, i) => (
              <MenuItem value={item?.id} key={i}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            placeholder="Tìm kiếm"
            sx={{ maxWidth: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip arrow title="Tìm kiếm" placement="top">
                    <IconButton
                      onClick={() => setFilter({ ...filter, search: search })}
                    >
                      <AiOutlineSearch />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}
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
        {!isLoading && <DataTable dense data={students} columns={columns} />}
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
