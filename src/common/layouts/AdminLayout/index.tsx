import { Outlet } from 'react-router-dom'
import AuthProvider from '../AuthProvider'
import AdminHeader from './Header'
import Menu from './Menu'

const AdminLayout = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black bg-opacity-[0.03] text-neutral-800">
        <AdminHeader />
        <div className="fixed top-[72px] left-0 h-[calc(100vh-72px)] w-[240px] max-w-[80vw]">
          <Menu />
        </div>
        <div className="ml-[240px] p-4">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  )
}

export default AdminLayout
