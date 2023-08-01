import { Folder, Document, User } from '@/types'

export interface Storage {
  folders: Folder[]
  documents: Document[]
  saves: Document[]
  locallySavedDocuments: Document[]
  user: User | null
  bookmarks: Document[]
}

export const updateLocalStorage = (param: Partial<Storage> | ((store: Storage) => Storage)) => {
  const data = window.localStorage.getItem('walle-data')

  let store: Storage

  try {
    if (!data) throw new Error()
    store = JSON.parse(data)
  } catch (e) {
    store = {
      documents: [],
      folders: [],
      saves: [],
      locallySavedDocuments: [],
      user: null,
      bookmarks: [],
    }
  }

  if (typeof param === 'function') {
    store = param(store)
  } else {
    store = { ...store, ...param }
  }

  window.localStorage.setItem('walle-data', JSON.stringify(store))
}

export const saveDocumentLocally = (param: Document) => {
  const data = window.localStorage.getItem('walle-data')

  let store: Storage

  try {
    if (!data) throw new Error()
    store = JSON.parse(data)
  } catch (e) {
    store = {
      documents: [],
      folders: [],
      saves: [],
      locallySavedDocuments: [],
      user: null,
      bookmarks: [],
    }
  }

  const localDoc = store.locallySavedDocuments.find((item) => item.id === param.id)

  if (localDoc) {
    store.locallySavedDocuments = store.locallySavedDocuments.map((item) =>
      item.id === param.id ? { ...item, ...param } : item
    )
  } else {
    store.locallySavedDocuments.push(param)
  }

  window.localStorage.setItem('walle-data', JSON.stringify(store))
}

export const updateLocallySavedDocument = (param: Partial<Document> & { id: string }) => {
  const data = window.localStorage.getItem('walle-data')

  let store: Storage

  try {
    if (!data) throw new Error()
    store = JSON.parse(data)
  } catch (e) {
    store = {
      documents: [],
      folders: [],
      saves: [],
      locallySavedDocuments: [],
      user: null,
      bookmarks: [],
    }
  }

  store.locallySavedDocuments = store.locallySavedDocuments.map((item) =>
    item.id === param.id ? { ...item, ...param } : item
  )

  window.localStorage.setItem('walle-data', JSON.stringify(store))
}

export const getLocallySavedDocument = (id: string) => {
  const data = window.localStorage.getItem('walle-data')

  let store: Storage

  try {
    if (!data) throw new Error()
    store = JSON.parse(data)
  } catch (e) {
    store = {
      documents: [],
      folders: [],
      saves: [],
      locallySavedDocuments: [],
      user: null,
      bookmarks: [],
    }
  }

  const document = store.locallySavedDocuments.find((item) => item.id === id)

  return document
}

export const getLocalStorage = () => {
  const data = window.localStorage.getItem('walle-data')

  let store: Storage

  try {
    if (!data) throw new Error()
    store = JSON.parse(data)
  } catch (e) {
    store = {
      documents: [],
      folders: [],
      saves: [],
      locallySavedDocuments: [],
      user: null,
      bookmarks: [],
    }
  }

  return store as Storage
}
