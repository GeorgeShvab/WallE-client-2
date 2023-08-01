import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit'

const asyncThunkErrorWrapper = <T = undefined>(
  fn: AsyncThunkPayloadCreator<any, T>
): AsyncThunkPayloadCreator<any, T> => {
  return async (data, api) => {
    try {
      return await fn(data, api)
    } catch (e: any) {
      if (!e.response) return api.rejectWithValue(JSON.parse(JSON.stringify(e)))
      return api.rejectWithValue(e.response.data)
    }
  }
}

export default asyncThunkErrorWrapper
