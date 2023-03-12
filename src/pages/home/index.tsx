import useAuth from 'common/hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { isAuthenticated, isAuthenticating } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticating && !isAuthenticated) {
      navigate('/login')
    }
    if (!isAuthenticating && isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated])

  return <></>
}

export default HomePage
