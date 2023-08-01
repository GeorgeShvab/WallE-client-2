import axios from '@/axios'
import { RequestState, User } from '@/types'
import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootStore } from '../store'
import { getDocumentAsyncAction } from './document'
import asyncThunkErrorWrapper from '@/utils/asyncThunkErrorWrapper'
import { loadingStates } from '../states'

interface UserState {
  user: User | null
  loadingState: RequestState
  isUnauthorized: boolean
}

const initialState: UserState = {
  user: null,
  loadingState: loadingStates.initial,
  isUnauthorized: false,
}

interface GetUserAction extends Action {
  payload: User
}

interface UpdateUserAction extends Action {
  payload: Partial<User>
}

interface UpdateAvatarAction extends Action {
  payload: { avatar: string }
}

interface GetMeActionReject extends Action {
  payload: any
}

interface UpdateUserStateAction extends Action {
  payload: Partial<UserState>
}

export const getMeAsyncAction = createAsyncThunk(
  'get-me',
  asyncThunkErrorWrapper(async () => {
    const { data } = await axios.get<User>('/api/user/me')

    return data
  })
)

export const signoutAsyncAction = createAsyncThunk(
  'signout',
  asyncThunkErrorWrapper(async (_, api) => {
    await axios.post(
      '/api/auth/signout',
      {},
      {
        headers: {
          refresh_token: window.localStorage.getItem('refresh_token'),
          access_token: `Bearer ${window.localStorage.getItem('access_token')}`,
        },
      }
    )

    api.dispatch({ type: 'RESET', payload: {} })
  })
)

export const updateMeAsyncAction = createAsyncThunk(
  'update-me',
  asyncThunkErrorWrapper(async (body: Partial<User>, api) => {
    api.dispatch(updateUser(body))

    const currentState = api.getState() as RootStore

    if (currentState?.document?.document) {
      api.dispatch(getDocumentAsyncAction(currentState.document.document.id))
    }

    await axios.patch('/api/user/update/data', body)
  })
)

export const updateAvatarAsyncAction = createAsyncThunk(
  'udpdate-avatar',
  asyncThunkErrorWrapper(async (body: FormData, api) => {
    const { data } = await axios.patch<{ avatar: string }>('/api/user/update/avatar', body)

    api.dispatch(updateUser(data))

    const currentState = api.getState() as RootStore

    if (currentState?.document?.document) {
      api.dispatch(getDocumentAsyncAction(currentState.document.document.id))
    }

    return data
  })
)

export const removeAvatarAsyncAction = createAsyncThunk(
  'udpdate-avatar',
  asyncThunkErrorWrapper(async (_, api) => {
    await axios.patch('/api/user/update/avatar', { image: null })

    api.dispatch(updateUser({ avatar: null }))

    const currentState = api.getState() as RootStore

    if (currentState?.document?.document) {
      api.dispatch(getDocumentAsyncAction(currentState.document.document.id))
    }

    return { avatar: null }
  })
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: UpdateUserAction) => {
      if (state.user) {
        return { ...state, user: { ...state.user, ...action.payload } }
      }
    },
    updateUserState: (state, action: UpdateUserStateAction) => {
      return { ...state, ...action.payload }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(updateAvatarAsyncAction.fulfilled, (state, action: UpdateAvatarAction) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload }
        }
      })
      .addCase(getMeAsyncAction.pending, (state) => {
        return {
          ...state,
          loadingState: { ...state.loadingState, isLoading: true },
        }
      })
      .addCase(getMeAsyncAction.rejected, (state, action: GetMeActionReject) => {
        if (action.payload?.statusCode === 401) {
          return {
            ...state,
            loadingState: loadingStates.failed,
            isUnauthorized: true,
          }
        }

        return {
          ...state,
          loadingState: loadingStates.failed,
        }
      })
      .addCase(getMeAsyncAction.fulfilled, (state, action: GetUserAction) => {
        return {
          user: action.payload,
          loadingState: loadingStates.succeed,
          isUnauthorized: false,
        }
      }),
})

export default userSlice

export const { updateUser, updateUserState } = userSlice.actions

export const selectUser = (param: RootStore) => param.user
