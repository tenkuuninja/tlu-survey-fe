import useAuth from 'common/hooks/useAuth'
import { AiOutlineUser } from 'react-icons/ai'
import MenuItem from './MenuItem'
import navigation from './navigation'

const AdminMenu = () => {
  const { role, user } = useAuth()

  return (
    <div className="h-full w-full border-r border-neutral-100 bg-white">
      <div className="flex p-4 lg:hidden">
        <div className="flex items-center justify-center">
          <AiOutlineUser className="text-[36px]" />
        </div>
        <div className="mr-2">
          <p>{user?.name}</p>
          <p className="text-sm text-red-400">{role}</p>
        </div>
      </div>
      {navigation.map((item, i) => (
        <>
          <p className="px-6 py-3 text-xs font-medium text-neutral-500" key={i}>
            {item.label}
          </p>
          {item?.children
            ?.filter((item) => item?.roles?.includes(role))
            ?.map((subItem, j) => (
              <MenuItem {...subItem} />
            ))}
        </>
      ))}
    </div>
  )
}

export default AdminMenu
