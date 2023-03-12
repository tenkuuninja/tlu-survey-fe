import AccountApi from 'common/apis/account'
import { removeAuth, updateAuthUser } from 'common/redux/slice/auth.slice'
import { useDispatch, useSelector } from 'react-redux'

type Role = 'admin' | 'teacher' | 'student'

export default function useAuth() {
  const auth = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

  const role: Role = auth.role

  const handleLogin = async (user: any) => {
    dispatch(removeAuth())
    const res = await AccountApi.login(user)
    localStorage.setItem('tlu:token', res?.token)
    dispatch(updateAuthUser(res))
  }

  const handleRetrieveCurrentUser = async () => {
    const res = await AccountApi.getCurrentUser()
    if (res?.token) {
      localStorage.setItem('tlu:token', res?.token || '')
      dispatch(updateAuthUser(res))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('tlu:token')
    dispatch(removeAuth())
  }

  return {
    login: handleLogin,
    retrieveCurrentUser: handleRetrieveCurrentUser,
    logout: handleLogout,
    role: role,
    user: auth.user,
    isAuthenticated: !!auth.isAuthenticated,
    isAuthenticating: !!auth.isAuthenticating,
  }
}
