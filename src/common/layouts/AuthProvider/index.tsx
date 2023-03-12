import useAuth from 'common/hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthProvider({ children }: any) {
  const { isAuthenticated, isAuthenticating, retrieveCurrentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    retrieveCurrentUser()
  }, [])

  useEffect(() => {
    if (!isAuthenticating && !isAuthenticated) {
      navigate('/login')
    }
    if (!isAuthenticating && isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated])

  return <>{children}</>
}
