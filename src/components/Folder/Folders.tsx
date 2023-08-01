import * as types from '@/types'
import { FC, memo, useCallback } from 'react'
import DropWrapper from '../DropWrapper'
import Folder from './Index'
import { relocateDocumentAction } from '@/redux/slices/folders'
import { useAppDispatch } from '@/redux/store'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const Folders: FC<{ folders: (types.Folder & { documents: types.Document[] })[] }> = ({ folders }) => {
  const dispatch = useAppDispatch()

  const handleDrop = useCallback((doc: types.Document, folder: types.Folder) => {
    dispatch(relocateDocumentAction({ document: doc, folder: folder.id }))
  }, [])

  return (
    <TransitionGroup component="ul">
      {folders.map((item) => (
        <CSSTransition key={item.id} timeout={300} classNames="folder">
          <DropWrapper
            render={({ documents, onDrop }) => {
              return <Folder {...item} onDrop={(doc: types.Document) => onDrop(doc)} documents={documents} />
            }}
            container="li"
            documents={item.documents}
            onDrop={(document) => {
              handleDrop(document, item)
            }}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default memo(Folders)
