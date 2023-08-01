import { getBookmarksAsyncAction, selectBookmarks } from '@/redux/slices/bookmarks'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getLocalStorage } from '@/utils/localstorage'
import { useEffect } from 'react'

const useBookmarks = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBookmarksAsyncAction())
  }, [])

  const data = useAppSelector(selectBookmarks)

  const localBookmarks = getLocalStorage().bookmarks

  let bookmarks

  if (data.loadingState.isSuccess) {
    bookmarks = data.bookmarks
  } else {
    bookmarks = localBookmarks
  }

  return { ...data, bookmarks: bookmarks }
}

export default useBookmarks
