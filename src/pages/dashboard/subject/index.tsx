import {
  Button,
  IconButton,
  Skeleton,
  TextField,
  InputAdornment,
  Tooltip,
  Select,
  MenuItem,
} from '@mui/material'
import SubjectApi from 'common/apis/subject'
import DepartmentApi from 'common/apis/department'
import useAuth from 'common/hooks/useAuth'
import { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai'
import EditDialog from './EditDialog'
import DeleteDialog from './DeleteDialog'
import { Helmet } from 'react-helmet'

const SubjectDashboardPage = () => {
  const { role } = useAuth()
  const [isLoading, setLoading] = useState(false)
  const [filter, setFilter] = useState<any>({ department: 0 })
  const [subjects, setSubjects] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [subjectToUpdate, setSubjectToUpdate] = useState<any>(null)
  const [subjectToDelete, setSubjectToDelete] = useState<any>(null)

  const handleFetchSubject = async () => {
    setLoading(true)
    const params = { ...filter }
    if (+params.department === 0) {
      delete params.department
    }
    const res = await SubjectApi.getAll(params)
    setSubjects(res.data)
    setLoading(false)
  }

  useEffect(() => {
    handleFetchSubject()
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
      name: 'Mã môn',
      selector: (row) => row.code,
    },
    {
      name: 'Tên môn',
      selector: (row) => row.name,
    },
    {
      name: 'Thuộc Khoa',
      selector: (row) => row.department?.code,
    },
    {
      name: 'Số tín chỉ',
      selector: (row) => row.credit_number,
    },
    {
      name: 'Mô tả',
      selector: (row) => row.description,
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <IconButton
            size="small"
            color="info"
            onClick={() => setSubjectToUpdate(row)}
          >
            <AiOutlineEdit />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => setSubjectToDelete(row)}
          >
            <AiOutlineDelete />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <div className="min-h-[600px] rounded-md border border-neutral-100 bg-white p-4">
      <Helmet>
        <title>Quảng lý môn học | Trang khảo sát Đại học Thuỷ Lợi</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Môn học</h2>
        {role === 'admin' && (
          <Button onClick={() => setSubjectToUpdate({})}>
            <AiOutlinePlus /> Thêm
          </Button>
        )}
      </div>
      {role === 'admin' && (
        <div className="mt-4 flex items-center justify-end gap-4">
          <Select
            size="small"
            value={+filter.department}
            onChange={(e) =>
              setFilter({ ...filter, department: e.target.value })
            }
            fullWidth
            sx={{ maxWidth: 300 }}
          >
            <MenuItem value="0">-- Tất cả khoa --</MenuItem>
            {departments?.map((item, i) => (
              <MenuItem value={+item?.id} key={i}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
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
                    <IconButton onClick={handleFetchSubject}>
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
        {!isLoading && <DataTable dense data={subjects} columns={columns} />}
      </div>
      <EditDialog
        open={!!subjectToUpdate}
        onClose={() => setSubjectToUpdate(null)}
        data={subjectToUpdate}
        onSuccess={handleFetchSubject}
      />
      <DeleteDialog
        open={!!subjectToDelete}
        onClose={() => setSubjectToDelete(null)}
        data={subjectToDelete}
        onSuccess={handleFetchSubject}
      />
    </div>
  )
}

export default SubjectDashboardPage
