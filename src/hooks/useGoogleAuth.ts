import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { useAppDispatch } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { show } from '@/redux/slices/alert'
import useMutation from './useMutation'
import { authorizeWithGoogle } from '@/api/user'
import { updateUserState } from '@/redux/slices/user'
import { User } from '@/types'

type SuccessResponse = Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>

type ErrorResponse = Pick<TokenResponse, 'error' | 'error_description' | 'error_uri'>

interface ResponseBody {
  access_token: string
  refresh_token: string
  user: User
}

const useGoogleAuth = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { mutateAsync } = useMutation<{ access_token: string }, ResponseBody>(authorizeWithGoogle)

  const onSuccess = async (response: SuccessResponse) => {
    const data = await mutateAsync({ access_token: response.access_token })

    window.localStorage.setItem('access_token', data.access_token)
    window.localStorage.setItem('refresh_token', data.refresh_token)

    dispatch(
      updateUserState({
        user: data.user,
        loadingState: {
          isLoading: false,
          isError: false,
          isSuccess: true,
        },
        isUnauthorized: false,
      })
    )

    navigate('/')
  }

  const onError = (response: ErrorResponse) => {
    dispatch(show({ message: 'Помилка авторизації' }))
  }

  return useGoogleLogin({
    onSuccess,
    onError,
  })
}

export default useGoogleAuth
