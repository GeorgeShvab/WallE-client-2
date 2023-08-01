import { deleteFolderAsyncAction, updateFolderAsyncAction } from '@/redux/slices/folders'
import { useAppDispatch } from '@/redux/store'
import { Folder } from '@/types'
import { FC, useState } from 'react'
import DialogInput from '../UIKit/DialogInput'
import Dialog from '../UIKit/Dialog'

interface State {
  isDeletionModalOpened: boolean
  isRenameModalOpened: boolean
  renameError?: string
}

const FolderActions: FC<Folder> = (props) => {
  const dispatch = useAppDispatch()

  const [state, setState] = useState<State>({
    isDeletionModalOpened: false,
    isRenameModalOpened: false,
  })

  const changeState = (param: Partial<State>) => setState((prev) => ({ ...prev, ...param }))

  const handleDelete = () => {
    dispatch(deleteFolderAsyncAction(props.id))
  }

  const handleRename = (title: string) => {
    title = title.trim()

    if (!title.length) {
      setState((prev) => ({ ...prev, renameError: 'Назва повинна містити принанні 1 символ' }))
      return
    } else if (title.length > 30) {
      setState((prev) => ({ ...prev, renameError: 'Назва повинна містити не більше 30 символів' }))
      return
    }

    setState((prev) => ({ ...prev, isRenameModalOpened: false }))

    dispatch(updateFolderAsyncAction({ ...props, title }))
  }

  return (
    <div className="py-1.5 rounded bg-white shadow">
      <DialogInput
        open={state.isRenameModalOpened}
        title={`Перейменувати папку "${props.title}"`}
        text="Введіть нову назву папки:"
        severity="success"
        onClose={() => changeState({ isRenameModalOpened: false })}
        onConfirm={handleRename}
        error={state.renameError}
        inputAttributes={{
          minLength: 1,
        }}
      />
      <Dialog
        open={state.isDeletionModalOpened}
        title={`Видалити папку "${props.title}"?`}
        text="Папку буде видалено назавжди."
        confirmText="Видалити"
        onClose={() => changeState({ isDeletionModalOpened: false })}
        severity="danger"
        onConfirm={handleDelete}
      />
      <ul>
        <li
          onClick={() => changeState({ isDeletionModalOpened: true })}
          className="hover:bg-neutral-100 text-neutral-700 transition-colors px-4 py-1.5 cursor-pointer"
          role="button"
        >
          Видалити
        </li>
        <li
          onClick={() => changeState({ isRenameModalOpened: true })}
          className="hover:bg-neutral-100 text-neutral-700 transition-colors px-4 py-1.5 cursor-pointer"
          role="button"
        >
          Перейменувати
        </li>
      </ul>
    </div>
  )
}

export default FolderActions
