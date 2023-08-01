import { FC, useLayoutEffect, useRef } from 'react'
import Portal from './Portal'
import { Severity } from '@/types'
import AnimationWrapper from '../AnimationWrapper'

interface Props {
  message: string
  open: boolean
  onClose?: () => void
  severity?: Severity
}

const Alert: FC<Props> = ({ message, open, onClose, severity = 'error' }) => {
  const time = useRef<number>()

  useLayoutEffect(() => {
    if (open) {
      time.current = setTimeout(() => {
        onClose && onClose()
      }, 5000)
    }
  }, [open])

  return (
    <Portal>
      <AnimationWrapper
        open={open}
        stateClassNames={{
          default: 'fixed z-50 rounded right-1/2 translate-x-1/2 transition-all',
          open: 'top-10',
          close: 'top-[-40px]',
        }}
      >
        <div className={`max-w-[90vw] w-full md:w-auto md:text-left text-center rounded p-3 alert-${severity}`}>
          {message}
        </div>
      </AnimationWrapper>
    </Portal>
  )
}

export default Alert
