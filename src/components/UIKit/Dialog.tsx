import Modal from './Modal'
import { FC, ReactElement, useEffect, useRef } from 'react'
import ModalContainer from '../ModalContainer'

interface Props {
  title?: string | ReactElement
  text?: string | ReactElement
  open: boolean
  onClose: () => void
  severity?: 'danger' | 'success' | undefined
  onConfirm?: () => void
  onDeny?: () => void
  denyText?: string
  confirmText?: string
  autofocus?: boolean
}

const Dialog: FC<Props> = ({
  title,
  text,
  open,
  onClose,
  severity = 'error',
  onConfirm,
  onDeny,
  denyText = 'Відмінити',
  confirmText = 'Підтвердити',
}) => {
  const ref = useRef<HTMLButtonElement>(null)

  const handleConfirm = () => {
    onConfirm && onConfirm()
    onClose()
  }

  const handleDeny = () => {
    onDeny && onDeny()
    onClose()
  }

  useEffect(() => {
    if (open && ref.current) {
      ref.current?.focus()
    }
  }, [open])

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <>
          {title && <h2 className="text-lg font-medium mb-3 text-base text-black-main">{title}</h2>}
          {text && <p className="text-neutral-500 mb-8 text-sm md:text-base">{text}</p>}
          <div className="flex justify-between">
            <button
              className="bg-neutral-100 text-sm md:text-base px-4 py-2 rounded text-neutral-500 hover:bg-neutral-200 transition-colors"
              onClick={handleDeny}
              ref={ref}
            >
              {denyText}
            </button>
            <button
              className={`px-4 py-2 text-sm md:text-base rounded transition-colors ${
                severity === 'danger'
                  ? 'bg-red-400 hover:bg-red-300 text-white'
                  : severity === 'success'
                  ? 'bg-theme hover:bg-theme-light text-white'
                  : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
              }`}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </>
      </ModalContainer>
    </Modal>
  )
}

export default Dialog
