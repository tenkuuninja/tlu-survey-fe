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
