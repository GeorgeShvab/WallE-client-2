import { hide, selectAlert } from '@/redux/slices/alert'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { FC } from 'react'
import Alert from './UIKit/Alert'

const ReduxAlert: FC = () => {
  const dispatch = useAppDispatch()

  const alert = useAppSelector(selectAlert)

  const handleClose = () => {
    dispatch(hide())
  }

  return <Alert open={alert.state} severity={alert.severity} message={alert.message || ''} onClose={handleClose} />
}

export default ReduxAlert
