import { AxiosResponse } from 'axios'
import { useState } from 'react'

interface State<T> {
  error: any
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  data: T | undefined
}

const useMutation = <T, D = any>(fn: (arg: T) => Promise<AxiosResponse<D>>) => {
  const [state, setState] = useState<State<D>>({
    error: undefined,
    isError: false,
    isSuccess: false,
    isLoading: false,
    data: undefined,
  })

  return {
    ...state,
    mutateAsync: async (arg: T) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }))

        const { data } = await fn(arg)

        setState((prev) => ({ ...prev, isLoading: false, isError: false, isSuccess: true, error: false, data: data }))

        return data
      } catch (e: any) {
        setState((prev) => ({ ...prev, error: e, isLoading: false, isSuccess: false, isError: true }))

        throw e
      }
    },
  }
}

export default useMutation
