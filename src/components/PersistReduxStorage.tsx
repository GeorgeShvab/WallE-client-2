import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getLocalStorage, getLocallySavedDocument, saveDocumentLocally, updateLocalStorage } from '@/utils/localstorage'
import { FC, ReactElement, memo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
  children: ReactElement
}

const Container: FC<Props> = memo(({ children }) => {
  return children
})

const PersistReduxStorage: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()

  const { saves, documents, user, folders, document, bookmarks } = useAppSelector((store) => store)

  const { pathname } = useLocation()

  useEffect(() => {
    const localStorage = getLocalStorage()

    let localDocument

    if (/documents/.test(pathname)) {
      const documentId = pathname.split('/').reverse()[0]

      localDocument = getLocallySavedDocument(documentId)
    }

    dispatch({
      type: 'PERSIST',
      payload: {
        documents: { ...documents, documents: localStorage.documents },
        saves: { ...saves, saves: localStorage.saves },
        folders: { ...folders, folders: localStorage.folders },
        user: { ...user, user: localStorage.user },
        document: { ...document, document: localDocument || null },
        bookmarks: { ...bookmarks, bookmarks: localStorage.bookmarks },
      },
    })
  }, [])

  useEffect(() => {
    if (documents.loadingState.isSuccess) {
      updateLocalStorage({ documents: documents.documents })
    }
  }, [documents])

  useEffect(() => {
    if (bookmarks.loadingState.isSuccess) {
      updateLocalStorage({ bookmarks: bookmarks.bookmarks })
    }
  }, [bookmarks])

  useEffect(() => {
    if (saves.loadingState.isSuccess) {
      updateLocalStorage({ saves: saves.saves })
    }
  }, [saves])

  useEffect(() => {
    if (folders.loadingState.isSuccess) {
      updateLocalStorage({ folders: folders.folders })
    }
  }, [folders])

  useEffect(() => {
    if (user.loadingState.isSuccess && !user.isUnauthorized) {
      updateLocalStorage({ user: user.user })
    }
  }, [user])

  useEffect(() => {
    if (document.loadingState.isSuccess && document.document) {
      saveDocumentLocally(document.document)
    }
  }, [document])

  return <Container>{children}</Container>
}

export default PersistReduxStorage
