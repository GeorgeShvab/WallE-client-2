import DocumentActions from '@/components/Document/DocumentActions'
import ContextMenu from '@/components/UIKit/ContextMenu'
import IconButton from '@/components/UIKit/IconButton'
import { bookmarkDocumentAsyncAction } from '@/redux/slices/bookmarks'
import { selectUser } from '@/redux/slices/user'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { Document, DocumentSavingState } from '@/types'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, CAN_REDO_COMMAND, UNDO_COMMAND, REDO_COMMAND } from 'lexical'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

interface HistoryState {
  canUndo: boolean
  canRedo: boolean
}

interface Props {
  document: Document
  savingState: DocumentSavingState
}

const DocumentControls: FC<Props> = ({ savingState, document }) => {
  const dispatch = useAppDispatch()

  const actionsButtonEl = useRef<HTMLButtonElement>(null)

  const { user } = useAppSelector(selectUser)

  const [editor] = useLexicalComposerContext()

  const [isActionsMenuOpened, setIsActionsMenuOpened] = useState<boolean>(false)

  const [historyState, setHistoryState] = useState<HistoryState>({
    canRedo: false,
    canUndo: false,
  })

  useEffect(() => {
    const unregisterCanUndo = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload: boolean) => {
        setHistoryState((prev) => ({ ...prev, canUndo: payload }))
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )

    const unregisterCanRedo = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload: boolean) => {
        setHistoryState((prev) => ({ ...prev, canRedo: payload }))
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )

    return () => {
      unregisterCanRedo()
      unregisterCanUndo()
    }
  }, [editor])

  const handleUndo = useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined)
  }, [])

  const handleRedo = useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined)
  }, [])

  const handleBookmark = () => {
    dispatch(bookmarkDocumentAsyncAction({ document }))
  }

  return (
    <div className="flex gap-2">
      {user && user.id === document.owner ? (
        <ContextMenu
          open={isActionsMenuOpened}
          onClose={() => setIsActionsMenuOpened(false)}
          menuPosition="bottom-right"
          anchor={actionsButtonEl}
        >
          <div className="shadow rounded bg-white">
            <div className="flex gap-1 rounded md:hidden p-1 justify-evenly">
              <IconButton
                onClick={handleUndo}
                className={`transition-all ${historyState.canUndo ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
              </IconButton>
              <IconButton
                onClick={handleRedo}
                className={`transition-all ${historyState.canRedo ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                </svg>
              </IconButton>
              {user && user.id !== document.owner && (
                <IconButton
                  onClick={handleBookmark}
                  className={`transition-all ${document.bookmarked ? 'text-theme' : ''}`}
                  title={document.bookmarked ? 'Видалити із вкладок' : 'Додати у вкладки'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={document.bookmarked ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </IconButton>
              )}
              <IconButton
                className={`transition-all cursor-default ${
                  savingState.isSavingError
                    ? '!bg-red-50 text-red-400 hover:!bg-red-50 hover:!text-red-400'
                    : '!bg-green-50 !text-green-400 hover:!bg-green-50 hover:!text-green-400'
                }`}
                title={
                  savingState.isSaving
                    ? 'Файл зберігається'
                    : savingState.isSavingError
                    ? 'Помилка при збереженні'
                    : 'Файл збережено'
                }
              >
                {savingState.isSaving ? (
                  <svg
                    className="spinner"
                    stroke="currentColor"
                    width="14px"
                    height="14px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="path"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      cx="10"
                      cy="10"
                      r="9"
                    ></circle>
                  </svg>
                ) : savingState.isSavingError ? (
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
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </IconButton>
            </div>
            <DocumentActions {...document} className="shadow-none bg-none p-0" />
          </div>
        </ContextMenu>
      ) : (
        <ContextMenu
          open={isActionsMenuOpened}
          onClose={() => setIsActionsMenuOpened(false)}
          menuPosition="bottom-right"
          anchor={actionsButtonEl}
          closeOnMenuClick={false}
        >
          <div className="flex gap-1 md:hidden bg-white shadow p-1 rounded">
            <IconButton
              onClick={handleUndo}
              className={`transition-all ${historyState.canUndo ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            </IconButton>
            <IconButton
              onClick={handleRedo}
              className={`transition-all ${historyState.canRedo ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
              </svg>
            </IconButton>
            {user && user.id !== document.owner && (
              <IconButton
                onClick={handleBookmark}
                className={`transition-all ${document.bookmarked ? 'text-theme' : ''}`}
                title={document.bookmarked ? 'Видалити із вкладок' : 'Додати у вкладки'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={document.bookmarked ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </IconButton>
            )}
            <IconButton
              className={`transition-all cursor-default ${
                savingState.isSavingError
                  ? '!bg-red-50 text-red-400 hover:!bg-red-50 hover:!text-red-400'
                  : '!bg-green-50 !text-green-400 hover:!bg-green-50 hover:!text-green-400'
              }`}
              title={
                savingState.isSaving
                  ? 'Файл зберігається'
                  : savingState.isSavingError
                  ? 'Помилка при збереженні'
                  : 'Файл збережено'
              }
            >
              {savingState.isSaving ? (
                <svg
                  className="spinner"
                  stroke="currentColor"
                  width="14px"
                  height="14px"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="path"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    cx="10"
                    cy="10"
                    r="9"
                  ></circle>
                </svg>
              ) : savingState.isSavingError ? (
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
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </IconButton>
          </div>
        </ContextMenu>
      )}
      <IconButton
        className={user && user.id === document.owner ? '' : 'md:hidden'}
        onClick={() => setIsActionsMenuOpened((prev) => !prev)}
        ref={actionsButtonEl}
      >
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
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </IconButton>
      <IconButton
        onClick={handleUndo}
        className={`transition-all hidden md:flex ${
          historyState.canUndo ? 'opacity-100' : 'opacity-30 pointer-events-none'
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
      </IconButton>
      <IconButton
        onClick={handleRedo}
        className={`transition-all hidden md:flex ${
          historyState.canRedo ? 'opacity-100' : 'opacity-30 pointer-events-none'
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
        </svg>
      </IconButton>
      {user && user.id !== document.owner && (
        <IconButton
          onClick={handleBookmark}
          className={`transition-all hidden md:flex ${document.bookmarked ? 'text-theme' : ''}`}
          title={document.bookmarked ? 'Видалити із вкладок' : 'Додати у вкладки'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={document.bookmarked ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </IconButton>
      )}
      <IconButton
        className={`transition-all hidden md:flex cursor-default ${
          savingState.isSavingError
            ? '!bg-red-50 text-red-400 hover:!bg-red-50 hover:!text-red-400'
            : '!bg-green-50 !text-green-400 hover:!bg-green-50 hover:!text-green-400'
        }`}
        title={
          savingState.isSaving
            ? 'Файл зберігається'
            : savingState.isSavingError
            ? 'Помилка при збереженні'
            : 'Файл збережено'
        }
      >
        {savingState.isSaving ? (
          <svg
            className="spinner"
            stroke="currentColor"
            width="14px"
            height="14px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle className="path" fill="none" strokeWidth="2" strokeLinecap="round" cx="10" cy="10" r="9"></circle>
          </svg>
        ) : savingState.isSavingError ? (
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </IconButton>
    </div>
  )
}

export default DocumentControls
