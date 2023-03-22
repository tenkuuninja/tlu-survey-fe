import { List, Popover } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import useAuth from 'common/hooks/useAuth'
import { useState } from 'react'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import ConfirmLogoutDialog from '../ConfirmLogoutDialog'

const AdminHeader = ({ toggleMenu }) => {
  const { user, role } = useAuth()
  const [isOpenConfirmLogoutModal, setOpenConfirmLogoutModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const open = Boolean(anchorEl)

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-neutral-100 bg-white px-6 py-2">
      <AiOutlineMenu
        className="text-[36px] leading-none lg:hidden"
        onClick={toggleMenu}
      />
      <img
        className="hidden max-h-[50px] lg:block"
        src="/assets/large-logo.png"
        alt=""
      />
      <img className="max-h-[50px] lg:hidden" src="/assets/logo.jpg" alt="" />
      <div
        className="flex cursor-pointer items-center leading-none"
        onClick={(e: any) => setAnchorEl(e?.currentTarget)}
      >
        <div className="mr-2 hidden text-right lg:block">
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
          {role !== 'admin' && (
            <Link to="/dashboard/change-password">
              <ListItemButton>
                <p className="text-neutral-700">Đổi mật khẩu</p>
              </ListItemButton>
            </Link>
          )}
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
