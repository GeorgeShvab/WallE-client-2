import axios from '@/axios'
import { Document, RequestState } from '@/types'
import asyncThunkErrorWrapper from '@/utils/asyncThunkErrorWrapper'
import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootStore } from '../store'
import { updateDocument } from './document'
import { loadingStates } from '../states'

interface BookmarksState {
  bookmarks: Document[]
  loadingState: RequestState
}

const initialState: BookmarksState = {
  bookmarks: [],
  loadingState: loadingStates.initial,
}

interface AddBookmarkAction extends Action {
  payload: Document
}

interface RemoveBookmarkAction extends Action {
  payload: string
}

interface UpdateDocumentInBookmarksAction extends Action {
  payload: Document
}

interface GetBookmarksAction extends Action {
  payload: Document[]
}

export const bookmarkDocumentAsyncAction = createAsyncThunk(
  'bookmark-document',
  asyncThunkErrorWrapper(async ({ document }: { document: Document }, api) => {
    const newDoc = { ...document, bookmarked: !document.bookmarked }

    if (document.bookmarked) {
      api.dispatch(removeDocumentFromBookmarks(document.id))
    } else {
      api.dispatch(addDocumentToBookmarks(newDoc))
    }

    api.dispatch(updateDocument(newDoc))

    await axios.post(`/api/document/${document.id}/bookmark`)
  })
)

export const getBookmarksAsyncAction = createAsyncThunk(
  'get-bookmarks',
  asyncThunkErrorWrapper(async () => {
    const { data } = await axios.get('/api/documents/bookmarks')

    return data
  })
)

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addDocumentToBookmarks: (state, action: AddBookmarkAction) => {
      state.bookmarks = [action.payload, ...state.bookmarks]
    },
    removeDocumentFromBookmarks: (state, action: RemoveBookmarkAction) => {
      state.bookmarks = state.bookmarks.filter((item) => item.id !== action.payload)
    },
    updateDocumentInBookmarks: (state, action: UpdateDocumentInBookmarksAction) => {
      state.bookmarks = state.bookmarks.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarksAsyncAction.pending, (state) => {
        return { ...state, loadingState: { ...state.loadingState, isLoading: true } }
      })
      .addCase(getBookmarksAsyncAction.rejected, (state) => {
        return { ...state, loadingState: loadingStates.failed }
      })
      .addCase(getBookmarksAsyncAction.fulfilled, (state, action: GetBookmarksAction) => {
        return { bookmarks: action.payload, loadingState: loadingStates.succeed }
      })
  },
})

export default bookmarksSlice

export const { addDocumentToBookmarks, removeDocumentFromBookmarks, updateDocumentInBookmarks } = bookmarksSlice.actions

export const selectBookmarks = (root: RootStore) => root.bookmarks
