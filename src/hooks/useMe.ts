import { selectUser } from '@/redux/slices/user'
import { useAppSelector } from '@/redux/store'
import { getLocalStorage } from '@/utils/localstorage'

const useMe = () => {
  const data = useAppSelector(selectUser)

  const localUser = getLocalStorage().user

  let user

  if (data.loadingState.isSuccess) {
    user = data.user
  } else {
    user = localUser
  }

  return { ...data, user: user }
}

export default useMe
