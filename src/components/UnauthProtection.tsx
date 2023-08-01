import { selectUser } from '@/redux/slices/user'
import { useAppSelector } from '@/redux/store'
import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactElement
  loader?: ReactElement
  fallback?: ReactElement
  onAuthorized?: () => void
  redirect?: boolean
}

// Protection for content that should be visible only for unauthorized users
const UnauthProtection: FC<Props> = ({ children, fallback = null, loader = null, onAuthorized, redirect }) => {
  const { user, isUnauthorized, loadingState } = useAppSelector(selectUser)

  if (!isUnauthorized && user) {
    onAuthorized && onAuthorized()

    if (redirect) {
      return <Navigate to="/" />
    } else {
      return fallback
    }
  }

  if (loadingState.isLoading && !user && loader) return loader

  return children
}

export default UnauthProtection
