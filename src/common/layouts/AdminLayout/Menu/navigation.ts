import {
  AiOutlineBook,
  AiOutlineDashboard,
  AiOutlineKey,
  AiOutlinePoweroff,
  AiOutlineUser,
} from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { SlGraduation } from 'react-icons/sl'
import { VscOpenPreview } from 'react-icons/vsc'

export default [
  {
    label: 'Điều khiển',
    children: [
      {
        label: 'Bảng điều khiển',
        path: '/dashboard',
        icon: AiOutlineDashboard,
      },
    ],
  },
  {
    label: 'Quản lý',
    children: [
      {
        label: 'Khảo sát',
        path: '/dashboard/survey',
        icon: VscOpenPreview,
      },
      {
        label: 'Giảng viên',
        path: '/dashboard/lecturer',
        icon: SlGraduation,
      },
      {
        label: 'Sinh viên',
        path: '/dashboard/student',
        icon: AiOutlineUser,
      },
      {
        label: 'Lớp học',
        path: '/dashboard/class',
        icon: BsPeople,
      },
      {
        label: 'Môn học',
        path: '/dashboard/subject',
        icon: AiOutlineBook,
      },
    ],
  },
  {
    label: 'Tài khoản',
    children: [
      {
        label: 'Đổi mật khẩu',
        path: '/dashboard/change-password',
        icon: AiOutlineKey,
      },
      {
        label: 'Đăng xuất',
        icon: AiOutlinePoweroff,
        action: 'logout',
      },
    ],
  },
]
