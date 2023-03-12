import { Button, IconButton, Skeleton } from '@mui/material'
import SurveyApi from 'common/apis/teacher'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlinePlus,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import EditDialog from './EditDialog'

const LecturerDashboardPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [lectures, setLectures] = useState<any[]>([])
  const [lectureToUpdate, setLectureToUpdate] = useState<any>(null)
  const [lectureToDelete, setLectureToDelete] = useState<any>(null)

  const handleFetchLecture = async() => {
    setLoading(true)
    const res = await SurveyApi.getAll()
    setLectures(res.data)
    setLoading(false)
  }

  useEffect(() => {
    handleFetchLecture()
  }, [])

  const columns = [
    {
      name: 'Mã',
      selector: (row) => row.code,
    },
    {
      name:'Họ tên',
      selector: (row) =>row.name,
    },
    {
      name: 'Khoa',
      selector: (row) =>row.department_id,
    },
    {
      name: 'Tên đăng nhập',
      selector: (row) => row.username,
    },
    {
      name: 'Mật khẩu',
      selector: (row) =>row.password_hashed,
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
      selector: (row) => row.sex,
    },
    {
      name: 'Trạng thái',
      selector: (row) => row.status,
    },
    {
      name: 'Hành động',
      selector: (row) => (
        
          <IconButton
            size="small"
            color="info"
            onClick={() => setLectureToUpdate(row)}
          >
          <AiOutlineEdit/>
          </IconButton>      
      ),
    },
  ]

  return (
    <div className="min-h-[600px] rounded-md border border-neutral-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Giảng viên</h2>
        <Button>
        <AiOutlineSearch/>
        </Button> 
        <Button onClick={() => setLectureToUpdate({})}>
          <AiOutlinePlus /> Thêm
        </Button>
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
        {!isLoading && <DataTable data={lectures} columns={columns} />}
      </div>
      <EditDialog
        open={!!lectureToUpdate}
        onClose={() => setLectureToUpdate(null)}
        data={lectureToUpdate}
        onSuccess={handleFetchLecture}
      />
    </div>
  )
}

export default LecturerDashboardPage
