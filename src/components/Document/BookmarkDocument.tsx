import * as types from '@/types'
import { FC, useState, MouseEvent, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'

interface Props extends types.Document {
  choosed?: boolean
  onBookmark?: (doc: types.Document) => void
}

const Document: FC<Props> = (props) => {
  const { choosed, onBookmark, ...document } = props

  const [doc, setDoc] = useState<types.Document>(document)

  useEffect(() => {
    setDoc(document)
  }, [JSON.stringify(document)])

  const handleSave = (e: MouseEvent) => {
    e.preventDefault()

    onBookmark && onBookmark(doc)

    setDoc((prev) => ({ ...prev, saved: !prev.saved }))
  }

  return (
    <div>
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
              doc.bookmarked ? 'text-theme' : ''
            }`}
            onClick={handleSave}
          >
            {doc.bookmarked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[22px] h-[22px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
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
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
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
