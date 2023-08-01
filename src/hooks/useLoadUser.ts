import { getMeAsyncAction } from '@/redux/slices/user'
import { useAppDispatch } from '@/redux/store'
import { useEffect } from 'react'

const useLoadUser = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMeAsyncAction())
  }, [])
}

export default useLoadUser
