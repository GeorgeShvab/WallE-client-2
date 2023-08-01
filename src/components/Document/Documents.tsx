import * as types from '@/types'
import { FC, memo, useCallback } from 'react'
import DocumentDragWrapper from './DocumentDragWrapper'
import { useParams } from 'react-router-dom'
import Document from './Index'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useAppDispatch } from '@/redux/store'
import { saveDocumentAsyncAction } from '@/redux/slices/saves'

interface Props {
  documents: types.Document[]
  onDrop?: (item: types.Document) => void
  onDrag?: (item: types.Document) => void
  onStopDragging?: (item: types.Document) => void
  draggable?: boolean
}

const Documents: FC<Props> = ({ documents, onDrop, onDrag, onStopDragging, draggable }) => {
  const dispatch = useAppDispatch()

  const { document } = useParams()

  const handleSave = useCallback(async (doc: types.Document) => {
    dispatch(saveDocumentAsyncAction({ document: doc }))
  }, [])

  if (draggable) {
    return (
      <TransitionGroup component="ul">
        {documents.map((item) => (
          <CSSTransition key={item.id} timeout={300} classNames="overflow-hidden document">
            <DocumentDragWrapper
              onDrag={onDrag}
              onDrop={onDrop}
              container="li"
              onStopDragging={onStopDragging}
              {...item}
            >
              <Document onSave={handleSave} choosed={document === item.id} {...item} />
            </DocumentDragWrapper>
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }

  return (
    <TransitionGroup component="ul">
      {documents.map((item) => (
        <CSSTransition key={item.id} timeout={300} classNames="document">
          <Document onSave={handleSave} choosed={document === item.id} {...item} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default memo(Documents)
