import { Folder, Document, RequestState } from '@/types'
import { createSlice, Action, createAsyncThunk } from '@reduxjs/toolkit'
import { RootStore } from '../store'
import { addDocumentToHolder, removeDocumentFromHolder } from './documents'
import axios from '@/axios'
import asyncThunkErrorWrapper from '@/utils/asyncThunkErrorWrapper'
import { loadingStates } from '../states'

interface FolderssState {
  folders: Folder[]
  loadingState: RequestState
}

const initialState: FolderssState = {
  folders: [],
  loadingState: loadingStates.initial,
}

interface AddFolderAction extends Action {
  payload: Folder
}

interface UpdateDocumentAction extends Action {
  payload: Partial<Document>
}

interface RemoveFolderAction extends Action {
  payload: string
}

interface GetFoldersAction extends Action {
  payload: Folder[]
}

interface AddDocumentAction extends Action {
  payload: { document: Document; folder: string }
}

interface RemoveDocumentAction extends Action {
  payload: string
}

interface CreateFolderAction extends Action {
  payload: Folder
}

interface UpdateFolderAction extends Action {
  payload: Partial<Folder> & { id: string }
}

export const createFolderAsyncAction = createAsyncThunk('create-folder', async (_, api) => {
  const { data } = await axios.post<Folder>('/api/folder')

  return data
})

export const relocateDocumentAction = createAsyncThunk(
  'relocate-document',
  asyncThunkErrorWrapper(async ({ document, folder }: { document: Document; folder?: string }, api) => {
    if (folder) {
      api.dispatch(removeDocumentFromHolder(document.id))
      api.dispatch(addDocumentToFolder({ document, folder }))
    } else {
      api.dispatch(addDocumentToHolder(document))
    }

    const { data } = await axios.patch(`/api/document/${document.id}/relocate`, folder ? { folder } : undefined)

    return data
  })
)

export const deleteFolderAsyncAction = createAsyncThunk(
  'delete-folder',
  asyncThunkErrorWrapper(async (id: string, api) => {
    api.dispatch(removeFolder(id))

    await axios.delete('/api/folder/' + id)
  })
)

export const updateFolderAsyncAction = createAsyncThunk(
  'update-folder',
  asyncThunkErrorWrapper(async (body: Partial<Folder> & { id: string }, api) => {
    api.dispatch(updateFolder(body))

    await axios.patch('/api/folder/' + body.id, body)
  })
)

export const getFoldersAsyncAction = createAsyncThunk(
  'get-folders',
  asyncThunkErrorWrapper(async (_) => {
    const { data } = await axios.get<Folder[]>('/api/folders')

    return data
  })
)

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    addFolder: (state, action: AddFolderAction) => {
      state.folders = [action.payload, ...state.folders]
    },
    removeFolder: (state, action: RemoveFolderAction) => {
      state.folders = state.folders.filter((item) => item.id !== action.payload)
    },
    updateFolder: (state, action: UpdateFolderAction) => {
      state.folders = state.folders?.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      )
    },
    updateDocumentInFolder: (state, action: UpdateDocumentAction) => {
      state.folders = state.folders.map((item) => ({
        ...item,
        documents: item.documents.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      }))
    },
    addDocumentToFolder: (state, action: AddDocumentAction) => {
      state.folders = state.folders.map((item) => {
        const folder = { ...item }

        folder.documents = item.documents.filter((item) => item.id !== action.payload.document.id)

        if (action.payload.folder === item.id) {
          folder.documents = [action.payload.document, ...folder.documents]
        }

        return folder
      })
    },
    removeDocumentFromFolder: (state, action: RemoveDocumentAction) => {
      state.folders = state.folders.map((item) => ({
        ...item,
        documents: item.documents.filter((item) => item.id !== action.payload),
      }))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoldersAsyncAction.pending, (state) => {
        return { ...state, loadingState: { ...state.loadingState, isLoading: true } }
      })
      .addCase(getFoldersAsyncAction.rejected, (state) => {
        return { ...state, loadingState: loadingStates.failed }
      })
      .addCase(getFoldersAsyncAction.fulfilled, (state, action: GetFoldersAction) => {
        return { folders: action.payload, loadingState: loadingStates.succeed }
      })
      .addCase(createFolderAsyncAction.fulfilled, (state, action: CreateFolderAction) => {
        state.folders = [action.payload, ...state.folders]
      })
  },
})

export default foldersSlice

export const {
  addFolder,
  removeFolder,
  updateFolder,
  addDocumentToFolder,
  updateDocumentInFolder,
  removeDocumentFromFolder,
} = foldersSlice.actions

export const selectFolders = (store: RootStore) => store.folders
