import { Document, RequestState } from '@/types'
import { createSlice, Action, createAsyncThunk } from '@reduxjs/toolkit'
import { RootStore } from '../store'
import axios from '@/axios'
import { removeDocumentFromFolder, updateDocumentInFolder } from './folders'
import { removeDocumentFromSaves, updateDocumentInSaves } from './saves'
import { updateDocument as updateCurrent } from './document'
import asyncThunkErrorWrapper from '@/utils/asyncThunkErrorWrapper'
import { loadingStates } from '../states'

interface DocumentsState {
  documents: Document[]
  loadingState: RequestState
}

const initialState: DocumentsState = {
  documents: [],
  loadingState: loadingStates.initial,
}

interface AddAction extends Action {
  payload: Document
}

interface UpdateAction extends Action {
  payload: Partial<Document>
}

interface RemoveAction extends Action {
  payload: string
}

interface GetDocumentsAction extends Action {
  payload: Document[]
}

interface CreateDocumentAction extends Action {
  payload: Document
}

export const updateDocumentAsyncAction = createAsyncThunk(
  'update-document',
  async (body: Partial<Document> & { id: string }, api) => {
    api.dispatch(updateDocumentInHolder(body))
    api.dispatch(updateDocumentInFolder(body))
    api.dispatch(updateDocumentInSaves(body))

    if ((api.getState() as RootStore)?.document?.document?.id === body.id) {
      api.dispatch(updateCurrent(body))
    }

    const { data } = await axios.patch('/api/document/' + body.id, body)

    return data
  }
)

export const createDocumentAction = createAsyncThunk(
  'add-document',
  asyncThunkErrorWrapper(async (_, api) => {
    const { data } = await axios.post('/api/document')

    return data
  })
)

export const getDocuments = createAsyncThunk(
  'get-documents',
  asyncThunkErrorWrapper(async (_) => {
    const { data } = await axios.get('/api/documents')

    return data
  })
)

export const getDocumentAsyncAction = createAsyncThunk('get-document', async (document: string, api) => {
  const { data } = await axios.get('/api/document/' + document)

  return data
})

export const deleteDocumentAsyncAction = createAsyncThunk(
  'delete-document',
  asyncThunkErrorWrapper(async (id: string, api) => {
    api.dispatch(removeDocumentFromHolder(id))
    api.dispatch(removeDocumentFromFolder(id))
    api.dispatch(removeDocumentFromSaves(id))

    await axios.delete('/api/document/' + id)
  })
)

export const inviteUsersAsyncAction = createAsyncThunk(
  'invite-users',
  asyncThunkErrorWrapper(async ({ emails, document }: { emails: string[]; document: string }) => {
    await axios.post(`/api/document/${document}/invite`, { emails })
  })
)

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocumentToHolder: (state, action: AddAction) => {
      state.documents = [action.payload, ...state.documents]
    },
    removeDocumentFromHolder: (state, action: RemoveAction) => {
      state.documents = state.documents.filter((item) => item.id !== action.payload)
    },
    updateDocumentInHolder: (state, action: UpdateAction) => {
      state.documents = state.documents.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDocuments.pending, (state) => {
        return { ...state, loadingState: { ...state.loadingState, isLoading: true } }
      })
      .addCase(getDocuments.rejected, (state) => {
        return { ...state, loadingState: loadingStates.failed }
      })
      .addCase(getDocuments.fulfilled, (state, action: GetDocumentsAction) => {
        return { documents: action.payload, loadingState: loadingStates.succeed }
      })
      .addCase(createDocumentAction.fulfilled, (state, action: CreateDocumentAction) => {
        state.documents = [action.payload, ...state.documents]
      })
  },
})

export default documentsSlice

export const { addDocumentToHolder, removeDocumentFromHolder, updateDocumentInHolder } = documentsSlice.actions

export const selectDocuments = (store: RootStore) => store.documents
