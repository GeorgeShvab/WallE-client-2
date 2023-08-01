import { FC } from 'react'
import { Document, DocumentSavingState } from '@/types'
import Button from '@/components/UIKit/Button'
import IconButton from '@/components/UIKit/IconButton'
import DocumentControls from './DocumentControls'
import DocumentUsers from './DocumentUsers'

interface Props {
  document: Document
  savingState: DocumentSavingState
  isEditable: boolean
}

const Header: FC<Props> = ({ document, savingState, isEditable }) => {
  return (
    <header className="py-2.5 px-2.5 md:px-6 flex items-center justify-between border-b gap-8">
      {isEditable ? (
        <DocumentControls document={document} savingState={savingState} />
      ) : (
        <>
          <Button color="theme" variant="outlined" href="/signin" className="w-auto hidden md:flex">
            Увійти
          </Button>
          <IconButton className="md:hidden" href="/signin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </IconButton>
        </>
      )}

      <h1 className="lg:text-xl font-medium text-center flex-1">{document?.title}</h1>

      <DocumentUsers {...document} />
    </header>
  )
}

export default Header
