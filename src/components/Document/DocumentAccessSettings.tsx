import { FC, useState, FormEvent } from 'react'
import Modal from '../UIKit/Modal'
import { Access, Document } from '@/types'
import { useAppDispatch } from '@/redux/store'
import { updateDocumentAsyncAction } from '@/redux/slices/documents'
import ModalContainer from '../ModalContainer'
import IconButton from '../UIKit/IconButton'
import Button from '../UIKit/Button'
import { show } from '@/redux/slices/alert'

interface Props extends Document {
  onClose: () => void
  open: boolean
}

const DocumenAccessSettings: FC<Props> = ({ onClose, open, ...document }) => {
  const dispatch = useAppDispatch()

  const [accessType, setAccessType] = useState<Access>(document.access)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onClose()

    await dispatch(updateDocumentAsyncAction({ ...document, access: accessType }))
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_APP_SERVER_ADDRESS}/documents/${document.id}`)

    dispatch(show({ severity: 'success', message: 'Посилання скопійовано' }))
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <form action="" onSubmit={handleSubmit}>
          <h3 className="font-semibold mb-4 text-[17px]">Налаштування доступу для "{document.title}"</h3>
          <ul className="mb-8">
            <li
              className={`py-2.5 px-5 transition-colors rounded ${
                accessType === 'private' ? 'bg-neutral-100' : 'bg-white hover:bg-neutral-50'
              }`}
              role="button"
              onClick={() => setAccessType('private')}
            >
              <h6 className="mb-1 font-medium text-neutral-700">Обмежений доступ</h6>
              <p className="text-neutral-400 text-sm">Документ буде доступним лише вам</p>
            </li>
            <li
              className={`py-2.5 px-5 transition-colors rounded ${
                accessType === 'public' ? 'bg-neutral-100' : 'bg-white hover:bg-neutral-50'
              }`}
              role="button"
              onClick={() => setAccessType('public')}
            >
              <h6 className="mb-1 font-medium text-neutral-700">Публічний</h6>
              <p className="text-neutral-400 text-sm">Документ буде доступним тим, в кого є посилання</p>
            </li>
          </ul>
          <div className="flex gap-2">
            <Button color="theme" className="flex-[3_0_auto] w-auto">
              Готово
            </Button>
            <IconButton type="button" title="Копіювати посилання на документ" onClick={handleCopyLink}>
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
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </IconButton>
          </div>
        </form>
      </ModalContainer>
    </Modal>
  )
}

export default DocumenAccessSettings
