import { getDocuments, selectDocuments } from '@/redux/slices/documents'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getLocalStorage } from '@/utils/localstorage'
import { useEffect } from 'react'

const useDocuments = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDocuments())
  }, [])

  const data = useAppSelector(selectDocuments)

  const localDocuments = getLocalStorage().documents

  let documents

  if (data.loadingState.isSuccess) {
    documents = data.documents
  } else {
    documents = localDocuments
  }

  return { ...data, documents: documents }
}

export default useDocuments
