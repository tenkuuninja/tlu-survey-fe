import { 
  Button, 
  IconButton, 
  Skeleton,
  TextField,
  InputAdornment,
  Tooltip, } from '@mui/material'
import SurveyApi from 'common/apis/subject'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import EditDialog from './EditDialog'
 
const SubjectDashboardPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [filter, setFilter] = useState<any>({})
  const [subjects, setSubjects] = useState<any[]>([])
  const [subjectToUpdate, setSubjectToUpdate] = useState<any>(null)
  const [subjectToDelete, setSubjectToDelete] = useState<any>(null)

  const handleFetchSubject = async() => {
    setLoading(true)
    const res = await SurveyApi.getAll(filter)
    setSubjects(res.data)
    setLoading(false)
  }

  useEffect(() => {
    handleFetchSubject()
  }, [])

  const columns = [
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
      selector: (row) => row.department_id,
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Môn học</h2>
        <Button onClick={() => setSubjectToUpdate({})}>
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
                  <IconButton onClick={handleFetchSubject}>
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
        {!isLoading && <DataTable data={subjects} columns={columns} />}
      </div>
      <EditDialog
        open={!!subjectToUpdate}
        onClose={() => setSubjectToUpdate(null)}
        data={subjectToUpdate}
        onSuccess={handleFetchSubject}
      />
    </div>
  )
}

export default SubjectDashboardPage
