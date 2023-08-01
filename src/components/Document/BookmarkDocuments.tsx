import * as types from '@/types'
import { FC, memo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useAppDispatch } from '@/redux/store'
import BookmarkDocument from './BookmarkDocument'
import { bookmarkDocumentAsyncAction } from '@/redux/slices/bookmarks'

interface Props {
  documents: types.Document[]
}

const BookmarkDocuments: FC<Props> = ({ documents }) => {
  const dispatch = useAppDispatch()

  const { document } = useParams()

  const handleBookmark = useCallback(async (doc: types.Document) => {
    dispatch(bookmarkDocumentAsyncAction({ document: doc }))
  }, [])

  return (
    <TransitionGroup component="ul">
      {documents.map((item) => (
        <CSSTransition key={item.id} timeout={300} classNames="document">
          <BookmarkDocument onBookmark={handleBookmark} choosed={document === item.id} {...item} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default memo(BookmarkDocuments)
