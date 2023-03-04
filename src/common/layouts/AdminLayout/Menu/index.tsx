import MenuItem from './MenuItem'
import navigation from './navigation'

const AdminMenu = () => {
  return (
    <div className="h-full w-full border-r border-neutral-100 bg-white">
      {navigation.map((item, i) => (
        <>
          <p className="px-6 py-3 text-xs font-medium text-neutral-500" key={i}>
            {item.label}
          </p>
          {item?.children?.map((subItem, j) => (
            <MenuItem {...subItem} />
          ))}
        </>
      ))}
    </div>
  )
}

export default AdminMenu
