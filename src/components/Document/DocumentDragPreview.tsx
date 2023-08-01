import * as types from '@/types'
import { FC } from 'react'
import Portal from '../UIKit/Portal'

interface Props extends types.Document {
  x: number
  y: number
}

const DocumentDragPreview: FC<Props> = ({ title, x, y }) => {
  return (
    <Portal>
      <div
        className="h-10 flex gap-4 items-center py-1.5 px-2 bg-neutral-100 rounded pointer-events-none absolute z-20 w-[264px] border border-theme"
        style={{ left: Math.round(x) + 'px', top: Math.round(y) + 'px' }}
      >
        <span className={`text-theme`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </span>
        <p
          className="w-full bg-transparent outline-none text-sm text-theme break-normal whitespace-nowrap"
          style={{ wordBreak: 'normal' }}
        >
          {title}
        </p>
      </div>
    </Portal>
  )
}

export default DocumentDragPreview
