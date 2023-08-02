import { FC } from 'react'
import Modal from '../UIKit/Modal'
import { Document } from '@/types'
import { useAppDispatch } from '@/redux/store'
import IconButton from '../UIKit/IconButton'
import Button from '../UIKit/Button'
import { show } from '@/redux/slices/alert'
import ModalContainer from '../ModalContainer'

interface Props extends Document {
  onClose: () => void
  open: boolean
}

const ShareDocument: FC<Props> = ({ onClose, open, title, id }) => {
  const dispatch = useAppDispatch()

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${import.meta.env.VITE_APP_SERVER_ADDRESS}/documents/${id}`)

      dispatch(show({ message: 'Посилання скопійовано', severity: 'success' }))
    } catch {
      dispatch(show({ message: 'Не вдалось скопіювати посилання' }))
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <>
          <h3 className="font-semibold md:text-[17px] mb-4">Поділитись документом "{title}"</h3>
          <div className="mb-8">
            <p className="mb-5 text-sm">Посилання на ваш документ:</p>
            <div className="flex items-center gap-3 justify-between">
              <div className="p-2 w-[calc(100%-52px)] flex-1 rounded bg-neutral-100 text-xs min-h-[40px] flex-1 flex items-center">
                <p className="break-words w-full">{document.location.href}</p>
              </div>
              <IconButton className="flex-[0_0_40px]" onClick={handleCopyLink}>
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
          </div>
          <Button color="theme" className="w-full" onClick={() => onClose()} fullWidth>
            Готово
          </Button>
        </>
      </ModalContainer>
    </Modal>
  )
}

export default ShareDocument
