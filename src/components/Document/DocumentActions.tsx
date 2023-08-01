import Dialog from '@/components/UIKit/Dialog'
import DocumentAccessSettings from '@/components/Document/DocumentAccessSettings'
import DocumentInvitations from '@/components/Document/DocumentInvitations'
import { deleteDocumentAsyncAction, updateDocumentAsyncAction } from '@/redux/slices/documents'
import { useAppDispatch } from '@/redux/store'
import { Document } from '@/types'
import { FC, memo, useState } from 'react'
import DialogInput from '@/components/UIKit/DialogInput'

interface State {
  isAccessModalOpened: boolean
  isInvitationModalOpened: boolean
  isDeletionModalOpened: boolean
  isRenameModalOpened: boolean
  renameError?: string
}

const DocumentActions: FC<Document & { className?: string }> = ({ className, ...props }) => {
  const dispatch = useAppDispatch()

  const [state, setState] = useState<State>({
    isAccessModalOpened: false,
    isInvitationModalOpened: false,
    isDeletionModalOpened: false,
    isRenameModalOpened: false,
  })

  const changeState = (param: Partial<State>) => setState((prev) => ({ ...prev, ...param }))

  const deleteDoc = () => {
    dispatch(deleteDocumentAsyncAction(props.id))
  }

  const handleUpdateTitle = (title: string) => {
    title = title.trim()

    if (!title.length) {
      setState((prev) => ({ ...prev, renameError: 'Назва повинна містити принанні 1 символ' }))
      return
    } else if (title.length > 30) {
      setState((prev) => ({ ...prev, renameError: 'Назва повинна містити не більше 30 символів' }))
      return
    }

    setState((prev) => ({ ...prev, isRenameModalOpened: false }))

    dispatch(updateDocumentAsyncAction({ id: props.id, title }))
  }

  return (
    <>
      <DocumentAccessSettings
        open={state.isAccessModalOpened}
        onClose={() => changeState({ isAccessModalOpened: false })}
        {...props}
      />
      <DocumentInvitations
        open={state.isInvitationModalOpened}
        onClose={() => changeState({ isInvitationModalOpened: false })}
        {...props}
      />
      <Dialog
        open={state.isDeletionModalOpened}
        onClose={() => changeState({ isDeletionModalOpened: false })}
        title={`Видалити документ "${props.title}"?`}
        text="Документ буде видалено назавжди."
        confirmText="Видалити"
        severity="danger"
        onConfirm={deleteDoc}
      />
      <DialogInput
        open={state.isRenameModalOpened}
        onClose={() => changeState({ isRenameModalOpened: false })}
        title={`Перейменувати документ "${props.title}"`}
        text="Введіть нову назву документа."
        severity="success"
        error={state.renameError}
        defaultValue={props.title}
        onConfirm={handleUpdateTitle}
        inputAttributes={{
          maxLength: 30,
          minLength: 1,
        }}
      />
      <div className={`py-1.5 rounded bg-white shadow ${className}`}>
        <ul>
          <li
            onClick={() => changeState({ isDeletionModalOpened: true })}
            className="hover:bg-neutral-100 text-neutral-700 transition-colors px-4 py-1.5 cursor-pointer whitespace-nowrap"
            role="button"
          >
            Видалити
          </li>
          <li
            onClick={() => changeState({ isRenameModalOpened: true })}
            className="hover:bg-neutral-100 text-neutral-700 transition-colors px-4 py-1.5 cursor-pointer whitespace-nowrap"
            role="button"
          >
            Перейменувати
          </li>
          <li
            onClick={() => changeState({ isAccessModalOpened: true })}
            className="hover:bg-neutral-100 text-neutral-700 transition-colors px-4 py-1.5 cursor-pointer whitespace-nowrap"
            role="button"
          >
            Налаштування доступу
          </li>
          <li
            onClick={() => changeState({ isInvitationModalOpened: true })}
            className="hover:bg-neutral-100 text-neutral-700 transition-colors px-4 py-1.5 cursor-pointer whitespace-nowrap"
            role="button"
          >
            Запросити користувачів
          </li>
        </ul>
      </div>
    </>
  )
}

export default memo(DocumentActions)
