import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import ClassApi from 'common/apis/class'
import StudentApi from 'common/apis/student'
import DepartmentApi from 'common/apis/department'
import useAuth from 'common/hooks/useAuth'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DataTable, { TableColumn } from 'react-data-table-component'
import {
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai'

const AddStudentDialog = ({ open, onClose, data, onSuccess }) => {
  const { role } = useAuth()
  const [departments, setDepartments] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState<any>('')
  const [filter, setFilter] = useState<any>({ department: '0' })
  const [itemToUpdate, setItemToUpdate] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [addstudents, setaddStudents] = useState<any[]>([])

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

  const handleAddClass = async(classid,studentid) => {
      const res = await ClassApi.addStudentToClass(classid,studentid)
      onSuccess && onSuccess()
      onClose()
      toast.success('Thêm sinh viên vào lớp thành công')
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
      name: 'Giới tính',
      width: '100px',
      center: true,
      cell: (row) => (row.sex === 1 ? 'Nam' : 'Nữ'),
    },
    {
      name: 'Thuộc khoa',
      cell: (row) => row.department?.code,
    },
    {
      name: 'Hành động',
      right: true,
      cell: (row) => (
        <>
          <Tooltip arrow title="Thêm" placement="top">
            <IconButton
              size="small"
              color="info"
              onClick={() => handleAddClass(data.class_id,row.id)}
            >
              <AiOutlinePlus />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ]

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        Danh sách sinh viên
      </DialogTitle>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  )
}

export default AddStudentDialog
