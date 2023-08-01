import { FC, ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Portal from './Portal'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactElement
  ms?: number
}

export const Modal: FC<Props> = ({ open, onClose, children, ms = 150 }) => {
  const containerEl = useRef<HTMLDivElement>(null)

  const [state, setState] = useState<boolean>(false)

  const [mounted, setMounted] = useState<boolean>(false)

  const time = useRef<number>()

  useLayoutEffect(() => {
    if (open) {
      clearTimeout(time.current)
      setMounted(true)
    } else {
      setState(false)
      time.current = setTimeout(() => {
        setMounted(false)
      }, ms)
    }
  }, [open])

  useEffect(() => {
    if (mounted) {
      setState(true)
    }
  }, [mounted])

  const handleKey = (e: KeyboardEvent) => {
    if (!mounted) return
    if (e.code === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKey)

    return () => {
      document.removeEventListener('keyup', handleKey)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <Portal>
      <div ref={containerEl} className={`z-50`} onClick={(e) => e.stopPropagation()}>
        <div
          className={`absolute bg-black/30 left-0 top-0 bottom-0 right-0 h-screen z-50 transition-all ${
            state ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => onClose()}
        />
        <div
          className={`absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 z-50 transition-all ${
            state ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
