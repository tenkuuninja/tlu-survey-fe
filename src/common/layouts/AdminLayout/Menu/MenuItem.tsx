import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { createElement, useState } from 'react'
import { IconType } from 'react-icons'
import { Link, useLocation } from 'react-router-dom'
import ConfirmLogoutDialog from '../ConfirmLogoutDialog'

interface MenuItemProps {
  icon: IconType
  label: string
  path?: string
  action?: string
}

const MenuItem = ({ icon, path, label, action }: MenuItemProps) => {
  const { pathname } = useLocation()
  const [isOpenConfirmLogoutModal, setOpenConfirmLogoutModal] = useState(false)
  const selected = path === pathname

  const handleClick = (action: string) => {
    switch (action) {
      case 'logout':
        setOpenConfirmLogoutModal(true)
        break

      default:
        break
    }
  }

  const content = (
    <ListItemButton
      selected={selected}
      sx={(theme) => ({
        paddingLeft: '24px',
        ':hover': {
          backgroundColor: theme.palette.primary[50],
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary[50],
          borderRight: `3px solid ${theme.palette.primary[500]}`,
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${theme.palette.primary[500]} !important`,
        },
      })}
    >
      <ListItemIcon sx={{ minWidth: '30px' }}>
        {createElement(icon, {
          className: selected ? 'text-primary-700' : 'text-neutral-900',
        })}
      </ListItemIcon>
      <ListItemText>
        <p
          className={
            'text-sm' +
            ` ${selected ? ' text-primary-700' : 'text-neutral-900'}`
          }
        >
          {label}
        </p>
      </ListItemText>
    </ListItemButton>
  )

  if (action) {
    return (
      <>
        <div onClick={() => handleClick(action)}>{content}</div>
        <ConfirmLogoutDialog
          open={isOpenConfirmLogoutModal}
          onClose={() => setOpenConfirmLogoutModal(false)}
        />
      </>
    )
  }

  if (path) {
    return <Link to={path}>{content}</Link>
  }

  return <></>
}

export default MenuItem
