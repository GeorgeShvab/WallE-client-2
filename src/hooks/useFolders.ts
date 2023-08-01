import { getFoldersAsyncAction, selectFolders } from '@/redux/slices/folders'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getLocalStorage } from '@/utils/localstorage'
import { useEffect } from 'react'

const useFolders = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFoldersAsyncAction())
  }, [])

  const data = useAppSelector(selectFolders)

  const localFolders = getLocalStorage().folders

  let folders

  if (data.loadingState.isSuccess) {
    folders = data.folders
  } else {
    folders = localFolders
  }

  return { ...data, folders: folders }
}

export default useFolders
