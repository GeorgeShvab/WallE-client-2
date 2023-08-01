import { DocumentState, getDocumentAsyncAction, selectDocument } from '@/redux/slices/document'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getLocallySavedDocument } from '@/utils/localstorage'
import { useEffect } from 'react'

interface Options {
  onError: (error: any) => void
}

const useDocument = (id: string, options?: Options): DocumentState => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getDocumentAsyncAction(id)).unwrap().catch(options?.onError)
    }
  }, [id])

  const data = useAppSelector(selectDocument)

  const locallySavedDocument = getLocallySavedDocument(id || '') || null

  let document

  if (data.loadingState.isSuccess) {
    document = data.document
  } else {
    document = locallySavedDocument
  }

  return { ...data, document: document }
}

export default useDocument
