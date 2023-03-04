import { removeAuth, updateAuthUser } from 'common/redux/slice/auth.slice'
import { useDispatch, useSelector } from 'react-redux'

export default function useAuth() {
  const auth = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

  const handleLogin = async (user: any) => {
    dispatch(removeAuth())
    dispatch(updateAuthUser(user))
  }

  const handleLogout = () => {
    dispatch(removeAuth())
  }

  return {
    login: handleLogin,
    logout: handleLogout,
    user: auth.user,
    isAuthenticated: !!auth.isAuthenticated,
    isAuthenticating: !!auth.isAuthenticating,
  }
}
