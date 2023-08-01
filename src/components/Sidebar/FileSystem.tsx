import { FC, memo } from 'react'
import DropWrapper from '../DropWrapper'
import Folders from '../Folder/Folders'
import Documents from '../Document/Documents'
import useDocuments from '@/hooks/useDocuments'
import useFolders from '@/hooks/useFolders'
import { Document } from '@/types'
import { useAppDispatch } from '@/redux/store'
import { relocateDocumentAction } from '@/redux/slices/folders'
import DocumentLoader from '../Document/DocumentLoader'

const FileSystem: FC = () => {
  const dispatch = useAppDispatch()

  const documents = useDocuments()
  const folders = useFolders()

  const handleDrop = (doc: Document) => {
    dispatch(relocateDocumentAction({ document: doc }))
  }

  if (
    documents.loadingState.isLoading &&
    !documents.documents.length &&
    folders.loadingState.isLoading &&
    !folders.folders.length
  ) {
    return new Array(8).fill(null).map((item, index) => <DocumentLoader key={index} />)
  }

  return (
    <ul className="flex flex-col">
      <li className="flex-0">
        <Folders folders={folders.folders} />
      </li>
      <li className="flex-1 flex min-h-[80px]">
        <DropWrapper
          container="ul"
          className="flex-1"
          onDrop={(doc) => handleDrop(doc)}
          documents={documents.documents}
          render={({ documents, onDrop }) => <Documents documents={documents} onDrop={onDrop} draggable />}
        />
      </li>
    </ul>
  )
}

export default memo(FileSystem)
