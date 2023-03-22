import { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AuthProvider from '../AuthProvider'
import AdminHeader from './Header'
import Menu from './Menu'

const AdminLayout = () => {
  const [isOpenMenu, setOpenMenu] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpenMenu(false)
  }, [pathname])

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black bg-opacity-[0.03] text-neutral-800">
        <AdminHeader toggleMenu={() => setOpenMenu(!isOpenMenu)} />
        <div className="fixed top-[72px] left-0 hidden h-[calc(100vh-72px)] w-[240px] max-w-[80vw] lg:block">
          <Menu />
        </div>
        <div className="p-4 lg:ml-[240px]">
          <Outlet />
        </div>
        <div
          className={
            'fixed inset-0 bg-black bg-opacity-20 transition-all' +
            ` ${isOpenMenu ? '' : 'pointer-events-none opacity-0'}`
          }
          onClick={() => setOpenMenu(false)}
        ></div>
        <div
          className={
            'fixed top-0 left-0 block h-screen w-[240px] max-w-[80vw] transition-all lg:hidden' +
            ` ${isOpenMenu ? '' : '-translate-x-full'}`
          }
        >
          <Menu />
        </div>
      </div>
    </AuthProvider>
  )
}

export default AdminLayout
