import useAuth from 'common/hooks/useAuth'
import { createElement } from 'react'
import { AiOutlineBook, AiOutlineKey, AiOutlineUser } from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { SlGraduation } from 'react-icons/sl'
import { VscOpenPreview } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const DashboardPage = () => {
  const { role } = useAuth()
  return (
    <div className="min-h-[600px] rounded-md border border-neutral-100 bg-white p-4">
      <Helmet>
        <title>Bảng điều khiển | Trang khảo sát Đại học Thuỷ Lợi</title>
      </Helmet>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {menu
          ?.filter((item) => item.roles.includes(role))
          .map((item, i) => (
            <Link
              to={item?.path}
              className="rounded-md border bg-primary-700 px-[8%] py-[25%] text-center text-[24px] text-white hover:bg-primary-800"
              key={i}
            >
              {createElement(item.icon, {
                className: 'mx-auto text-[36px] mb-[16px]',
              })}
              {item.label}
            </Link>
          ))}
      </div>
    </div>
  )
}

export default DashboardPage

const menu = [
  {
    label: 'Quản lý biểu mẫu',
    path: '/bang-dieu-khien/quan-ly-khao-sat',
    icon: VscOpenPreview,
    roles: ['admin', 'teacher', 'student'],
  },
  {
    label: 'Quản lý giảng viên',
    path: '/bang-dieu-khien/quan-ly-giang-vien',
    icon: SlGraduation,
    roles: ['admin'],
  },
  {
    label: 'Quản lý sinh viên',
    path: '/bang-dieu-khien/quan-ly-sinh-vien',
    icon: AiOutlineUser,
    roles: ['admin'],
  },
  {
    label: 'Quản lý môn học',
    path: '/bang-dieu-khien/quan-ly-mon-hoc',
    icon: AiOutlineBook,
    roles: ['admin'],
  },
  {
    label: 'Quản lý lớp học',
    path: '/bang-dieu-khien/quan-ly-lop-hoc',
    icon: BsPeople,
    roles: ['admin'],
  },
  {
    label: 'Lớp dạy',
    path: '/bang-dieu-khien/lop-day',
    icon: BsPeople,
    roles: ['teacher'],
  },
  {
    label: 'Lớp học',
    path: '/bang-dieu-khien/lop-hoc',
    icon: BsPeople,
    roles: ['student'],
  },
  {
    label: 'Đổi mật khẩu',
    path: '/bang-dieu-khien/doi-mat-khau',
    icon: AiOutlineKey,
    roles: ['teacher', 'student'],
  },
]
