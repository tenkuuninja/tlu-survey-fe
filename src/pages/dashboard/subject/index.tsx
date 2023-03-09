import { IconButton, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import EditDialog from './EditDialog'

const fakessj = [...new Array(10)].map((item, i) => ({
  id: i + 1,
  name: 'monhoc'+i,
  credit :3,
  department: 'CNTT',
  
}))
const SubjectDashboardPage = () => {
  const [subjects, setSubjects] = useState<any[]>([])
  const [subjectToUpdate, setSubjectToUpdate] = useState<any>(null)
  const [subjectToDelete, setSubjectToDelete] = useState<any>(null)

  const handleFetchSubject = () => {
    setSubjects(fakessj)
  }

  useEffect(() => {
    handleFetchSubject()
  }, [])

  const columns = [
    {
      name: 'Mã môn',
      selector: (row) => row.id,
    },
    {
      name: 'Tên môn',
      selector: (row) => row.name,
    },
    {
      name: 'Số tín chỉ',
      selector: (row) => row.credit,
    },
    {
      name: 'Khoa',
      selector: (row) => row.department,
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
        <Button>
        <AiOutlineSearch/>
        </Button> 
        <Button onClick={() => setSubjectToUpdate(null)}>
          <AiOutlinePlus /> Thêm
        </Button>
      </div>
      <div>
        <DataTable data={subjects} columns={columns} />
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
