import * as types from '@/types'
import { FC, useState, MouseEvent, useRef, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import DocumentActions from './DocumentActions'
import ContextMenu from '../UIKit/ContextMenu'

interface Props extends types.Document {
  choosed?: boolean
  onSave?: (doc: types.Document) => void
}

const Document: FC<Props> = (props) => {
  const { choosed, onSave, ...document } = props

  const documentEl = useRef<HTMLDivElement>(null)

  const [doc, setDoc] = useState<types.Document>(document)

  const [isActionsShown, setIsActionsShown] = useState<boolean>(false)

  useEffect(() => {
    setDoc(document)
  }, [JSON.stringify(document)])

  const handleSave = (e: MouseEvent) => {
    e.preventDefault()

    onSave && onSave(doc)

    setDoc((prev) => ({ ...prev, saved: !prev.saved }))
  }

  const handleContextMenuClick = (e: MouseEvent) => {
    e.preventDefault()
    setIsActionsShown(true)
  }

  return (
    <div ref={documentEl} onContextMenu={handleContextMenuClick}>
      <ContextMenu anchor={documentEl} onClose={() => setIsActionsShown(false)} open={isActionsShown}>
        <DocumentActions {...document} />
      </ContextMenu>
      <Link to={`/documents/${doc.id}`}>
        <div
          className={`flex h-10 gap-4 group items-center py-1.5 px-3 rounded hover:bg-[#efefef] transition-colors cursor-pointer ${
            choosed ? ' bg-[#efefef] ' : ''
          }`}
        >
          <span className={`text-neutral-400 group-hover:text-theme transition-colors ${choosed ? 'text-theme' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[22px] h-[22px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </span>
          <p className="document-title bg-transparent outline-none text-sm text-neutral-500 break-normal whitespace-nowrap max-w-[164px] text-clip overflow-hidden">
            {doc.title}
          </p>
          <span
            className={`text-neutral-400 md:opacity-0 ml-auto lg:invisible group-hover:opacity-100 group-hover:visible hover:text-theme transition-all ${
              doc.saved ? 'text-theme' : ''
            }`}
            onClick={handleSave}
          >
            {doc.saved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[22px] h-[22px]"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[22px] h-[22px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            )}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default memo(Document)
