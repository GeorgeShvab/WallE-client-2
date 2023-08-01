import { signoutAsyncAction } from '@/redux/slices/user'
import { useAppDispatch } from '@/redux/store'
import { useNavigate } from 'react-router-dom'

const useSignout = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  return async () => {
    await dispatch(signoutAsyncAction())

    localStorage.clear()

    navigate('/signin')
  }
}

export default useSignout
