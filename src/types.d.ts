export interface User {
  id: string
  name: string
  userName: string
  email: string
  password: string
  avatar: string | null
  activated: boolean
  mode: 'light' | 'dark'
  createdAt: string
  updatedAt: string
}

export type Access = 'public' | 'private' | 'restricted' | 'partly-restricted'

export interface Document {
  id: string
  owner: ObjectId
  title: string
  description: string
  text: string
  markdown: string
  access: Access
  saved: boolean
  bookmarked: boolean
  collaborators: User[]
  createdAt: string
  updatedAt: string
}

export interface Folder {
  id: string
  owner: ObjectId
  title: string
  documents: Document[]
}

export type Severity = 'success' | 'info' | 'warning' | 'error'

export interface DocumentSavingState {
  isSaved: boolean
  isSavingError: boolean
  isSaving: boolean
}

export interface DocumentWithLoadingState extends Document {
  savingState: DocumentSavingState
}

export interface RequestState {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
}
