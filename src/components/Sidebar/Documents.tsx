import { FC, memo } from 'react'
import DropWrapper from '../DropWrapper'
import DocumentsContainer from '../Document/Documents'
import { Document } from '@/types'
import { useAppDispatch } from '@/redux/store'
import { relocateDocumentAction } from '@/redux/slices/folders'

interface Props {
  documents: Document[]
}

const Documents: FC<Props> = ({ documents }) => {
  const dispatch = useAppDispatch()

  const handleDrop = (doc: Document) => {
    dispatch(relocateDocumentAction({ document: doc }))
  }

  return (
    <DropWrapper
      container="ul"
      className="flex-1"
      onDrop={(doc) => handleDrop(doc)}
      documents={documents}
      render={({ documents, onDrop }) => <DocumentsContainer documents={documents} onDrop={onDrop} draggable />}
    />
  )
}

export default memo(Documents)
