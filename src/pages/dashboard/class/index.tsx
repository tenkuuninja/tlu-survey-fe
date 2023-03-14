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
  InputAdornment,
  Tooltip,
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
  AiOutlineSearch,
} from 'react-icons/ai'
import EditDialog from './EditDialog'
import ListStudentDialog from './ListStudentDialog'
import DeleteDialog from './DeleteDialog'

const ClassDashboardPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [filter, setFilter] = useState<any>({})
  const [classes, setClasses] = useState<any[]>([])
  const [classToUpdate, setClassToUpdate] = useState<any>(null)
  const [listStudent, setListStudent] = useState<any>(null)
  const [classDelete, setClassDelete] = useState<any>(null)
  
  
  const handleFetchClass = async() => {
    setLoading(true)
    const res = await SurveyApi.getAll(filter)
    setClasses(res.data)
    setLoading(false)
  }
  

  useEffect(() => {
    handleFetchClass()
  }, [])

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
        <Tooltip arrow title="Xem" placement="top">
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
              onClick={() => setClassToUpdate(row)}
            >
              <AiOutlineEdit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Xoá" placement="top">
            <IconButton
              size="small"
              color="error"
              onClick={() => setClassDelete(row)}
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
        <h2 className="text-2xl font-semibold">Lớp học</h2>
        <Button onClick={() => setClassToUpdate({})}>
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
                  <IconButton onClick={handleFetchClass}>
                    <AiOutlineSearch />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
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
      <DeleteDialog
        open={!!classDelete}
        onClose={() => setClassDelete(null)}
        data={classDelete}
        onSuccess={handleFetchClass}
      />
    </div>
  )
}

export default ClassDashboardPage
