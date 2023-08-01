import { selectUser } from '@/redux/slices/user'
import { useAppSelector } from '@/redux/store'
import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactElement
  loader?: ReactElement
  fallback?: ReactElement
  onUnauthorized?: () => void
  redirect?: boolean
}

// Protection for content that shoud be visible only for authorized users
const AuthProtection: FC<Props> = ({ children, fallback = null, loader = null, onUnauthorized, redirect }) => {
  const { user, isUnauthorized, loadingState } = useAppSelector(selectUser)

  if (isUnauthorized) {
    onUnauthorized && onUnauthorized()

    if (redirect) {
      return <Navigate to="/signin" />
    } else {
      return fallback
    }
  }

  if (loadingState.isLoading && !user) return loader

  return children
}

export default AuthProtection
