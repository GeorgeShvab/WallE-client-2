import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Document, RequestState } from '@/types'
import { RootStore } from '../store'
import axios from '@/axios'
import { updateDocumentInHolder } from './documents'
import { updateDocumentInFolder } from './folders'
import { updateDocument } from './document'
import asyncThunkErrorWrapper from '@/utils/asyncThunkErrorWrapper'
import { loadingStates } from '../states'

interface SavesState {
  saves: Document[]
  loadingState: RequestState
}

const initialState: SavesState = {
  saves: [],
  loadingState: loadingStates.initial,
}

interface AddSaveAction extends Action {
  payload: Document
}

interface UpdateAction extends Action {
  payload: Partial<Document>
}

interface RemoveAction extends Action {
  payload: string
}

interface GetSavesAsyncAction extends Action {
  payload: Document[]
}

export const saveDocumentAsyncAction = createAsyncThunk(
  'add-document-to-favorite',
  asyncThunkErrorWrapper(async ({ document }: { document: Document }, api) => {
    const newDoc = { ...document, saved: !document.saved }
    if (document.saved) {
      api.dispatch(removeDocumentFromSaves(document.id))
    } else {
      api.dispatch(addDocumentToSaves(newDoc))
    }

    api.dispatch(updateDocumentInHolder(newDoc))
    api.dispatch(updateDocumentInFolder(newDoc))

    if ((api.getState() as RootStore)?.document?.document?.id === document.id) {
      api.dispatch(updateDocument(newDoc))
    }

    await axios.post(`/api/document/${document.id}/save`)
  })
)

export const getSavesAsyncAction = createAsyncThunk(
  'get-saves',
  asyncThunkErrorWrapper(async (_) => {
    const { data } = await axios.get('/api/documents/saved')

    return data
  })
)

const savesSlice = createSlice({
  name: 'saves',
  initialState,
  reducers: {
    addDocumentToSaves: (state, action: AddSaveAction) => {
      state.saves = [action.payload, ...state.saves]
    },
    removeDocumentFromSaves: (state, action: RemoveAction) => {
      state.saves = state.saves.filter((item) => item.id !== action.payload)
    },
    updateDocumentInSaves: (state, action: UpdateAction) => {
      state.saves = state.saves.map((item) => (item.id === action.payload.id ? { ...item, ...action.payload } : item))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSavesAsyncAction.pending, (state) => {
        return { ...state, loadingState: { ...state.loadingState, isLoading: true } }
      })
      .addCase(getSavesAsyncAction.rejected, (state) => {
        return { ...state, loadingState: loadingStates.failed }
      })
      .addCase(getSavesAsyncAction.fulfilled, (state, action: GetSavesAsyncAction) => {
        return { saves: action.payload, loadingState: loadingStates.succeed }
      })
  },
})

export default savesSlice

export const { addDocumentToSaves, removeDocumentFromSaves, updateDocumentInSaves } = savesSlice.actions

export const selectSaves = (store: RootStore) => store.saves
