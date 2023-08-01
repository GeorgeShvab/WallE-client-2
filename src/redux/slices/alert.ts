import { Severity } from '@/types'
import { Action, createSlice } from '@reduxjs/toolkit'
import { RootStore } from '../store'

interface AlertState {
  state: boolean
  message: string | undefined
  severity: Severity | undefined
}

export const initialState: AlertState = {
  state: false,
  message: undefined,
  severity: undefined,
}

interface ShowAction extends Action {
  payload: { message: string; severity?: Severity }
}

const errorSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    show: (state, action: ShowAction) => {
      state.message = action.payload.message
      state.severity = action.payload.severity
      state.state = true
    },
    hide: (state) => {
      state.state = false
    },
  },
})

export default errorSlice

export const { show, hide } = errorSlice.actions

export const selectAlert = (store: RootStore) => store.alert
