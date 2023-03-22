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
import GradeApi from 'common/apis/grade'
import ClassApi from 'common/apis/class'
import useAuth from 'common/hooks/useAuth'
import { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineEye,
} from 'react-icons/ai'
import DeleteDialog from './DeleteDialog'
import EditDialog from './EditDialog'
import ListStudentDialog from './ListStudentDialog'
import { Helmet } from 'react-helmet'

const ClassDashboardPage = () => {
  const { role } = useAuth()
  const [grades, setGrades] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState<any>('')
  const [filter, setFilter] = useState<any>({ grade: '0' })
  const [classes, setClasses] = useState<any[]>([])
  const [itemToUpdate, setItemToUpdate] = useState<any>(null)
  const [itemToDelete, setItemToDelete] = useState<any>(null)
  const [listStudent, setListStudent] = useState<any>(null)

  const handleFetchClass = async () => {
    setLoading(true)
    const params = { ...filter }
    if (+params.grade === 0) {
      delete params.grade
    }
    const res = await ClassApi.getAll(params)
    setClasses(res.data)
    setLoading(false)
  }

  useEffect(() => {
    handleFetchClass()
  }, [filter])

  useEffect(() => {
    const handleFetchGrade = async () => {
      const res = await GradeApi.getAll()
      setGrades(res.data)
    }
    handleFetchGrade()
  }, [])

  const columns: TableColumn<any>[] = [
    {
      name: 'Mã lớp',
      cell: (row) => row.code,
    },
    {
      name: 'Tên lớp',
      cell: (row) => row.name,
      minWidth: '200px',
    },
    {
      name: 'Tên môn',
      cell: (row) => row.subject?.name,
    },
    {
      name: 'Tên khóa',
      cell: (row) => row.grade_level?.name,
    },
    {
      name: 'Giảng viên',
      cell: (row) => row.teacher?.name,
    },
    {
      name: 'Trạng thái',
      cell: (row) => ['', 'Đang mở', 'Chưa mở', 'Đóng'][row.status] || '',
    },
    {
      name: 'Hành động',
      right: true,
      cell: (row) => (
        <>
          <Tooltip arrow title="Xem danh sách sinh viên" placement="top">
            <IconButton
              size="small"
              color="info"
              onClick={() => setListStudent(row)}
            >
              <AiOutlineEye />
            </IconButton>
          </Tooltip>
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
        <title>Quản lý lớp học | Trang khảo sát Đại học Thuỷ Lợi</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Lớp học</h2>
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
            value={filter.grade}
            onChange={(e) => setFilter({ ...filter, grade: e.target.value })}
            fullWidth
            sx={{ maxWidth: 300 }}
          >
            <MenuItem value="0">-- Tất cả khoá --</MenuItem>
            {grades?.map((item, i) => (
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
        {!isLoading && <DataTable dense data={classes} columns={columns} />}
      </div>
      <EditDialog
        open={!!itemToUpdate}
        onClose={() => setItemToUpdate(null)}
        data={itemToUpdate}
        onSuccess={handleFetchClass}
      />
      <DeleteDialog
        open={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        data={itemToDelete}
        onSuccess={handleFetchClass}
      />
      <ListStudentDialog
        open={!!listStudent}
        onclose={() => setListStudent(null)}
        data={listStudent}
        onSuccess={handleFetchClass}
      />
    </div>
  )
}

export default ClassDashboardPage
