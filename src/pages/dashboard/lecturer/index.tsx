import { IconButton, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import EditDialog from './EditDialog'

const fakesgv = [...new Array(10)].map((item, i) => ({
  id: i + 1,
  role: 'lecture',
  username: 'long1',
  email: 'ngbt1@gmail.com',
  name: 'Le Hoang Long',
  address: 'VietNam',
  phoneNumber: '0969696969696',
  sex: 'male',
  status: (i%2===0 ? 1 : 0),
}))

const LecturerDashboardPage = () => {

  const [lectures, setLectures] = useState<any[]>([])
  const [lectureToUpdate, setLectureToUpdate] = useState<any>(null)
  const [lectureToDelete, setLectureToDelete] = useState<any>(null)

  const handleFetchLecture = () => {
    setLectures(fakesgv)
  }

  useEffect(() => {
    handleFetchLecture()
  }, [])

  const columns = [
    {
      name: '#',
      selector: (row) => row.id,
    },
    {
      name: 'Tên đăng nhập',
      selector: (row) => row.username,
    },
    {
      name:'Họ tên',
      selector: (row) =>row.name,
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
      selector: (row) => row.phoneNumber,
    },
    {
      name: 'Giới tính',
      selector: (row) => row.sex,
    },
    {
      name: 'Trạng thái',
      selector: (row) => (row.status === 1 ? 'Còn công tác' : 'Đã ngừng công tác'),
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <IconButton
            size="small"
            color="info"
            onClick={() => setLectureToUpdate(row)}
          >
            <AiOutlineEdit />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => setLectureToDelete(row)}
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
        <h2 className="text-2xl font-semibold">Giảng viên</h2>
        <Button onClick={() => setLectureToUpdate(null)}>
          <AiOutlinePlus /> Thêm
        </Button>
      </div>
      <div>
        <DataTable data={lectures} columns={columns} />
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
