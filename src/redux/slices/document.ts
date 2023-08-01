import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '@/axios'
import { Document, DocumentSavingState, DocumentWithLoadingState, RequestState } from '@/types'
import { RootStore } from '../store'
import { updateDocumentInFolder } from './folders'
import { updateDocumentInSaves } from './saves'
import { updateDocumentInHolder } from './documents'
import asyncThunkErrorWrapper from '@/utils/asyncThunkErrorWrapper'
import { bookmarkDocumentAsyncAction } from './bookmarks'
import { loadingStates } from '../states'

export interface DocumentState {
  document: Document | null
  savingState: DocumentSavingState
  loadingState: RequestState
}

export interface NotNullDocumentState {
  document: Document
  savingState: DocumentSavingState
  loadingState: RequestState
}

const savingStates = {
  initial: { isSaved: true, isSaving: false, isSavingError: false },
  loadingSaved: { isSaved: true, isSaving: true, isSavingError: false },
  loadingFailed: { isSaved: false, isSaving: true, isSavingError: true },
  succeed: { isSaved: true, isSaving: false, isSavingError: false },
  failed: { isSaved: false, isSaving: false, isSavingError: true },
}

export const initialState: DocumentState = {
  document: null,
  loadingState: loadingStates.initial,
  savingState: savingStates.initial,
}

interface GetDocumentAction extends Action {
  payload: Document
}

interface UpdateDocument extends Action {
  payload: Partial<DocumentWithLoadingState>
}

interface UpdateDocumentStateAction extends Action {
  payload: Partial<DocumentState>
}

interface SetDocumentSavingStateAction extends Action {
  payload: Partial<DocumentSavingState>
}

interface SaveDocumentBody {
  id: string
  markdown: string
  text: string
}

export const getDocumentAsyncAction = createAsyncThunk(
  'get-document',
  asyncThunkErrorWrapper(async (document: string) => {
    const { data } = await axios.get('/api/document/' + document)

    return data
  })
)

// For saving document text and markdown
export const saveDocumentAsyncAction = createAsyncThunk(
  'save-document',
  asyncThunkErrorWrapper(async (body: SaveDocumentBody, api) => {
    const state = api.getState() as RootStore

    if (
      state.document.document &&
      state.user.user?.id !== state.document.document?.owner &&
      !state.document.document?.bookmarked
    ) {
      api.dispatch(bookmarkDocumentAsyncAction({ document: state.document.document }))
    }

    const { data } = await axios.patch('/api/document/' + body.id, body)

    return data
  })
)

// For general updation (title, access etc)
export const updateDocumentAsyncAction = createAsyncThunk(
  'update-document',
  asyncThunkErrorWrapper(async (body: Partial<Document> & { id: string }, api) => {
    api.dispatch(updateDocument(body))
    api.dispatch(updateDocumentInFolder(body))
    api.dispatch(updateDocumentInSaves(body))

    if ((api.getState() as RootStore)?.document?.document?.id === body.id) {
      api.dispatch(updateDocumentInHolder(body))
    }

    const { data } = await axios.patch('/api/document/' + body.id, body)

    return data
  })
)

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    updateDocument: (state, action: UpdateDocument) => {
      if (state.document) {
        return { ...state, document: { ...state.document, ...action.payload } }
      }
    },
    updateDocumentState: (state, action: UpdateDocumentStateAction) => {
      return { ...state, ...action.payload }
    },
    setDocumentSavingState: (state, action: SetDocumentSavingStateAction) => {
      return { ...state, savingState: { ...state.savingState, ...action.payload } }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveDocumentAsyncAction.pending, (state) => {
        return {
          ...state,
          savingState: { ...state.savingState, isSaving: true },
        }
      })
      .addCase(saveDocumentAsyncAction.rejected, (state) => {
        return {
          ...state,
          savingState: savingStates.failed,
        }
      })
      .addCase(saveDocumentAsyncAction.fulfilled, (state, action) => {
        return {
          ...state,
          document: { ...(state.document as Document), ...action.meta.arg },
          savingState: savingStates.succeed,
        }
      })
      .addCase(getDocumentAsyncAction.pending, (state) => {
        return {
          ...state,
          loadingState: { ...state.loadingState, isLoading: true },
        }
      })
      .addCase(getDocumentAsyncAction.rejected, (state) => {
        return {
          ...state,
          loadingState: loadingStates.failed,
        }
      })
      .addCase(getDocumentAsyncAction.fulfilled, (state, action: GetDocumentAction) => {
        return {
          document: action.payload,
          savingState: savingStates.initial,
          loadingState: loadingStates.succeed,
        }
      })
  },
})

export default documentSlice

export const selectDocument = (param: RootStore) => param.document

export const { updateDocument, updateDocumentState, setDocumentSavingState } = documentSlice.actions
