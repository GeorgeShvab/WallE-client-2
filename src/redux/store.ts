import { Action, AnyAction, Dispatch, MiddlewareAPI, combineReducers, configureStore } from '@reduxjs/toolkit'
import saves from './slices/saves'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import documents from './slices/documents'
import folders from './slices/folders'
import alert, { show } from './slices/alert'
import document from './slices/document'
import user from './slices/user'
import bookmarks from './slices/bookmarks'

const initialState = {
  documents: document.getInitialState(),
  folders: folders.getInitialState(),
  saves: saves.getInitialState(),
  alert: alert.getInitialState(),
  document: document.getInitialState(),
  user: user.getInitialState(),
  bookmarks: bookmarks.getInitialState(),
}

interface PayloadAction<T = any> extends Action {
  payload: T
}

const failedRequestMiddleware =
  (api: MiddlewareAPI<Dispatch<AnyAction>, any>) => (next: Dispatch) => (action: PayloadAction) => {
    if (/\/rejected/.test(action.type) && (action.payload?.statusCode === 400 || !action.payload.statusCode)) {
      api.dispatch(show({ message: "Помилка з'єднаня", severity: 'error' }))
    } else if (/\/rejected/.test(action.type) && action.payload?.statusCode === 400) {
      window.localStorage.clear()

      const win: Window = window // typescript error when string assign to window.location directly

      win.location = '/signin'
    }

    const result = next(action)

    return result
  }

const combinedReducers = combineReducers({
  documents: documents.reducer,
  folders: folders.reducer,
  saves: saves.reducer,
  alert: alert.reducer,
  document: document.reducer,
  user: user.reducer,
  bookmarks: bookmarks.reducer,
})

function rootReducer(state: any, action: AnyAction) {
  if (action.type === 'PERSIST') {
    return { ...state, ...action.payload }
  }

  if (action.type === 'RESET') {
    return initialState
  }

  return combinedReducers(state, action)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(failedRequestMiddleware),
})

export type RootStore = ReturnType<typeof combinedReducers>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector

export default store
