import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

interface State<T> {
  error: any
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  data: T | undefined
}

const useQuery = <T>(fn: () => Promise<AxiosResponse<T>>) => {
  const [state, setState] = useState<State<T>>({
    error: undefined,
    isError: false,
    isSuccess: false,
    isLoading: true,
    data: undefined,
  })

  useEffect(() => {
    ;(async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }))

        const { data } = await fn()

        setState((prev) => ({ ...prev, isLoading: false, isError: false, isSuccess: true, error: false, data: data }))
      } catch (e: any) {
        setState((prev) => ({ ...prev, error: e, isLoading: false, isSuccess: false, isError: true }))

        throw e
      }
    })()
  }, [])

  return state
}

export default useQuery
