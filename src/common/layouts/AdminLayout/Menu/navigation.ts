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
        path: '/bang-dieu-khien',
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
        path: '/bang-dieu-khien/khao-sat',
        icon: VscOpenPreview,
        roles: ['admin', 'teacher', 'student'],
      },
      {
        label: 'Giảng viên',
        path: '/bang-dieu-khien/giang-vien',
        icon: SlGraduation,
        roles: ['admin'],
      },
      {
        label: 'Sinh viên',
        path: '/bang-dieu-khien/sinh-vien',
        icon: AiOutlineUser,
        roles: ['admin'],
      },
      {
        label: 'Môn học',
        path: '/bang-dieu-khien/mon-hoc',
        icon: AiOutlineBook,
        roles: ['admin'],
      },
      {
        label: 'Lớp học',
        path: '/bang-dieu-khien/lop-hoc',
        icon: BsPeople,
        roles: ['admin', 'teacher', 'student'],
      },
    ],
  },
  {
    label: 'Tài khoản',
    children: [
      {
        label: 'Đổi mật khẩu',
        path: '/bang-dieu-khien/doi-mat-khau',
        icon: AiOutlineKey,
        roles: ['teacher', 'student'],
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
