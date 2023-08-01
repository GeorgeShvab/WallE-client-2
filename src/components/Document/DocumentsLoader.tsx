import { FC } from 'react'
import DocumentLoader from './DocumentLoader'

const DocumentsLoader: FC = () => {
  return (
    <div>
      {new Array(4).fill(null).map((item, index) => (
        <DocumentLoader key={index} />
      ))}
    </div>
  )
}

export default DocumentsLoader
