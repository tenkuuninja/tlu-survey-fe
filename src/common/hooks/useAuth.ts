import AccountApi from 'common/apis/account'
import { removeAuth, updateAuthUser } from 'common/redux/slice/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type Role = 'admin' | 'teacher' | 'student'

export default function useAuth() {
  const auth = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const role: Role = auth.role

  const handleLogin = async (user: any) => {
    dispatch(removeAuth())
    const res = await AccountApi.login(user)
    if (res?.token) {
      localStorage.setItem('tlu:token', res?.token)
      dispatch(updateAuthUser(res))
      navigate('/dashboard')
      toast.success('Đăng nhập thành công')
    }
  }

  const handleRetrieveCurrentUser = async () => {
    try {
      const res = await AccountApi.getCurrentUser()
      if (res?.role && res?.user) {
        dispatch(updateAuthUser(res))
      } else {
        dispatch(removeAuth())
      }
    } catch (error) {
      dispatch(removeAuth())
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
