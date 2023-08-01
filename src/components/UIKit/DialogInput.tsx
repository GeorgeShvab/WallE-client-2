import Modal from './Modal'
import { ChangeEvent, FC, InputHTMLAttributes, ReactElement, useState } from 'react'
import ModalContainer from '../ModalContainer'

interface Props {
  title?: string | ReactElement
  text?: string | ReactElement
  open: boolean
  onClose: () => void
  severity?: 'danger' | 'success' | undefined
  onConfirm?: (arg: string) => void
  onDeny?: (arg: string) => void
  denyText?: string
  confirmText?: string
  placeholder?: string
  defaultValue?: string
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>
  error?: string
}

const DialogInput: FC<Props> = ({
  title,
  text,
  open,
  onClose,
  severity = 'error',
  onConfirm,
  onDeny,
  denyText = 'Відмінити',
  confirmText = 'Підтвердити',
  placeholder,
  defaultValue,
  inputAttributes,
  error,
}) => {
  const [value, setValue] = useState<string>(defaultValue || '')

  const handleConfirm = () => {
    onConfirm && onConfirm(value)
  }

  const handleDeny = () => {
    onDeny && onDeny(value)
    onClose()
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <>
          {title && <h2 className="text-lg font-medium mb-3 text-black-main">{title}</h2>}
          {text && <p className="text-neutral-500 mb-4 text-sm md:text-base">{text}</p>}
          <input
            type="text"
            name="text"
            className="mb-2 bg-neutral-100 rounded p-2 w-full text-neutral-700 outline-none"
            placeholder={placeholder || ''}
            onInput={handleInput}
            value={value}
            {...inputAttributes}
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-between">
            <button
              className="bg-neutral-100 px-4 py-2 text-sm md:text-base rounded text-neutral-500 hover:bg-neutral-200 transition-colors"
              onClick={handleDeny}
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

export default DialogInput
