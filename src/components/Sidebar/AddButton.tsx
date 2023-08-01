import { createDocumentAction } from '@/redux/slices/documents'
import { createFolderAsyncAction } from '@/redux/slices/folders'
import { useAppDispatch } from '@/redux/store'
import { FC, useState } from 'react'

const AddButton: FC = () => {
  const dispatch = useAppDispatch()

  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleCreateDocument = () => {
    dispatch(createDocumentAction())
  }

  const handleCreateFolder = () => {
    dispatch(createFolderAsyncAction())
  }

  const handleEnter = () => {
    setIsHovered(true)
  }

  const handleLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className="flex items-center overflow-hidden md:w-[56px] justify-end"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className={`text-theme rounded p-0.5 hidden md:block overflow-hidden transition-all duration-500 ${
          isHovered ? 'w-0' : 'md:w-[24px]'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <div
        className={`flex items-center gap-2 md:gap-1 overflow-hidden transition-all duration-500 ${
          isHovered ? 'md:w-[56px]' : 'md:w-0'
        }`}
      >
        <button
          className="text-theme rounded p-0.5 hover:bg-neutral-100 transition-colors"
          onClick={handleCreateDocument}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-[22px] w-[22px] md:w-5 md:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </button>
        <button
          className="text-theme rounded p-0.5 hover:bg-neutral-100 transition-colors"
          onClick={handleCreateFolder}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-[22px] w-[22px] md:w-5 md:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default AddButton
