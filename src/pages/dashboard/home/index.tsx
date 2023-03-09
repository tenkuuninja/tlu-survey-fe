import { Button, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  return (
    <div className="min-h-[600px] rounded-md border border-neutral-100 bg-white p-4">
      <div className="grid grid-cols-3 gap-4">
        <Link
          to="/dashboard/survey"
          className="rounded-md border bg-primary-700 px-[8%] py-[25%] text-center text-[24px] text-white hover:bg-primary-800"
        >
          Khảo sát
        </Link>
        <Link
          to="/dashboard/lecturer"
          className="rounded-md border bg-primary-700 px-[8%] py-[25%] text-center text-[24px] text-white hover:bg-primary-800"
        >
          Giảng viên
        </Link>
        <Link
          to="/dashboard/student"
          className="rounded-md border bg-primary-700 px-[8%] py-[25%] text-center text-[24px] text-white hover:bg-primary-800 "
        >
          Sinh viên
        </Link>
        <Link
          to="/dashboard/class"
          className="rounded-md border bg-primary-700 px-[8%] py-[25%] text-center text-[24px] text-white hover:bg-primary-800"
        >
          Lớp học
        </Link>
        <Link
          to="/dashboard/subject"
          className="rounded-md border bg-primary-700 px-[8%] py-[25%] text-center text-[24px] text-white hover:bg-blue-800"
        >
          Môn học
        </Link>
      </div>
    </div>
  )
}

export default DashboardPage
