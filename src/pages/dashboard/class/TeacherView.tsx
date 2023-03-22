import {
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  Tooltip,
} from '@mui/material'
import ClassApi from 'common/apis/class'
import useAuth from 'common/hooks/useAuth'
import { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import { AiOutlineSearch } from 'react-icons/ai'

const ClassDashboardTeacherPage = () => {
  const { role } = useAuth()
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState<any>('')
  const [filter, setFilter] = useState<any>({ grade: '0' })
  const [classes, setClasses] = useState<any[]>([])

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
  ]

  return (
    <div className="min-h-[600px] rounded-md border border-neutral-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Lớp dạy</h2>
      </div>
      <div className="mt-4 flex items-center justify-end gap-4">
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
    </div>
  )
}

export default ClassDashboardTeacherPage
