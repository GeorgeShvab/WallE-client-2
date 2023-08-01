import { FC, useState, FormEvent } from 'react'
import Modal from '../UIKit/Modal'
import { Document } from '@/types'
import { useAppDispatch } from '@/redux/store'
import { inviteUsersAsyncAction } from '@/redux/slices/documents'
import ItemsInput from '../ItemsInput'
import ModalContainer from '../ModalContainer'
import Button from '../UIKit/Button'
import IconButton from '../UIKit/IconButton'
import { show } from '@/redux/slices/alert'

interface Props extends Document {
  onClose: () => void
  open: boolean
}

const DocumentInvitations: FC<Props> = ({ onClose, open, ...document }) => {
  const dispatch = useAppDispatch()

  const [emails, setEmails] = useState<string[]>([])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onClose()

    dispatch(inviteUsersAsyncAction({ emails, document: document.id }))
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_APP_SERVER_ADDRESS}/documents/${document.id}`)

    dispatch(show({ severity: 'success', message: 'Посилання скопійовано' }))
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <form action="" onSubmit={handleSubmit}>
          <h3 className="font-semibold mb-4 text-[17px]">Запросити користувачів до "{document.title}"</h3>
          <div className="mb-8">
            <div className="rounded border px-3 py-2">
              <ItemsInput onChange={(items) => setEmails(items)} placeholder="example@example.com" autoFocus />
            </div>
          </div>
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

export default DocumentInvitations
