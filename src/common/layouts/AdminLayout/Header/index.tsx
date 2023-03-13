import { List, Popover } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import useAuth from 'common/hooks/useAuth'
import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import ConfirmLogoutDialog from '../ConfirmLogoutDialog'

const AdminHeader = () => {
  const { user, role } = useAuth()
  const [isOpenConfirmLogoutModal, setOpenConfirmLogoutModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const open = Boolean(anchorEl)

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-neutral-100 bg-white px-6 py-2">
      <img className="max-h-[50px]" src="/assets/large-logo.png" alt="" />
      <div
        className="flex cursor-pointer items-center leading-none"
        onClick={(e: any) => setAnchorEl(e?.currentTarget)}
      >
        <div className="mr-2 text-right">
          <p>{user?.name}</p>
          <p className="text-sm text-red-400">{role}</p>
        </div>
        <div className="flex items-center justify-center">
          <AiOutlineUser className="text-[36px]" />
        </div>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ width: 200 }}>
          <Link to="/dashboard/change-password">
            <ListItemButton>
              <p className="text-neutral-700">Đổi mật khẩu</p>
            </ListItemButton>
          </Link>
          <ListItemButton onClick={() => setOpenConfirmLogoutModal(true)}>
            Đăng xuất
          </ListItemButton>
        </List>
      </Popover>
      <ConfirmLogoutDialog
        open={isOpenConfirmLogoutModal}
        onClose={() => setOpenConfirmLogoutModal(false)}
      />
    </header>
  )
}

export default AdminHeader
