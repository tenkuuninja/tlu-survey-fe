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
        roles: ['admin', 'teacher', 'student'],
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
        roles: ['admin', 'teacher', 'student'],
      },
      {
        label: 'Giảng viên',
        path: '/dashboard/lecturer',
        icon: SlGraduation,
        roles: ['admin'],
      },
      {
        label: 'Sinh viên',
        path: '/dashboard/student',
        icon: AiOutlineUser,
        roles: ['admin'],
      },
      {
        label: 'Môn học',
        path: '/dashboard/subject',
        icon: AiOutlineBook,
        roles: ['admin', 'teacher', 'student'],
      },
      {
        label: 'Lớp học',
        path: '/dashboard/class',
        icon: BsPeople,
        roles: ['admin', 'teacher'],
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
        roles: ['admin', 'teacher', 'student'],
      },
      {
        label: 'Đăng xuất',
        icon: AiOutlinePoweroff,
        action: 'logout',
        roles: ['admin', 'teacher', 'student'],
      },
    ],
  },
]
