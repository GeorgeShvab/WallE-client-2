import * as types from '@/types'
import { FC, useState, MouseEvent, useRef, useEffect, memo } from 'react'
import Documents from '../Document/Documents'
import ContextMenu from '../UIKit/ContextMenu'
import FolderActions from './FolderActions'

interface Props extends types.Folder {
  onDrop?: (doc: types.Document) => void
}

const Folder: FC<Props> = (props) => {
  const { onDrop, ...rest } = props

  const folderEl = useRef<HTMLDivElement>(null)

  const [folder, setFolder] = useState<types.Folder>(rest)

  useEffect(() => {
    setFolder(rest)
  }, [JSON.stringify(rest)])

  const [isActionsShown, setIsActionsShown] = useState<boolean>(false)

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  const handleClick = () => {
    setIsCollapsed((prev) => !prev)
  }

  const handleDrop = async (doc: types.Document) => {
    onDrop && onDrop(doc)
  }

  const handleContextMenuClick = (e: MouseEvent) => {
    e.preventDefault()

    setIsActionsShown(true)
  }

  return (
    <div
      className={`folder [&_.document-title]:max-w-[136px] transition-all duration-300 overflow-hidden ${
        isCollapsed ? 'pb-1.5' : ''
      }`}
      style={{
        height: isCollapsed ? folder.documents.length * 40 + 40 + 'px' : '40px',
      }}
      role="button"
    >
      <div
        className={`flex h-10 gap-4 group items-center py-1.5 px-3 rounded hover:bg-[#efefef] transition-colors cursor-pointer`}
        onContextMenu={handleContextMenuClick}
        onClick={handleClick}
        ref={folderEl}
      >
        <ContextMenu
          anchor={folderEl}
          onClose={() => {
            setIsActionsShown(false)
          }}
          open={isActionsShown}
        >
          <FolderActions {...folder} />
        </ContextMenu>

        <span className={`group-hover:text-theme transition-colors ${isCollapsed ? 'text-theme' : 'text-neutral-400'}`}>
          {isCollapsed ? (
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
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
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
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          )}
        </span>
        <p className="document-title bg-transparent outline-none text-sm text-neutral-500 break-normal whitespace-nowrap max-w-[168px] text-clip overflow-hidden">
          {folder.title}
        </p>
      </div>
      <div className="pl-[17px]">
        <div className="border-l pl-2.5">
          <Documents onDrop={handleDrop} documents={folder.documents} draggable />
        </div>
      </div>
    </div>
  )
}

export default memo(Folder)
