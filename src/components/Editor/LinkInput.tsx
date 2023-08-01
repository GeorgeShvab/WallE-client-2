import { ChangeEvent, ForwardRefRenderFunction, KeyboardEvent, forwardRef, useEffect, useRef, useState } from 'react'
import Portal from '../UIKit/Portal'
import { AnimationWrapperAlwaysRendered } from '../AnimationWrapper'

interface Props {
  position: { x: number; y: number } | undefined
  open: boolean
  onClose: () => void
  onConfirm: (value: string) => void
  onDeny: () => void
  defaultValue: string
}

const LinkInput: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { position, open, onClose, onConfirm, onDeny, defaultValue },
  ref
) => {
  const time = useRef<number>()

  const inputEl = useRef<HTMLInputElement>(null)

  const isMoved = useRef<boolean>(false)

  const [value, setValue] = useState<string>(defaultValue)

  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (open) {
      clearTimeout(time.current)

      setMounted(true)
    } else {
      time.current = setTimeout(() => {
        setMounted(false)
      }, 150)
    }
  }, [open])

  useEffect(() => {
    if (mounted) {
      inputEl.current?.focus()
    }
  }, [mounted])

  const handleConfirm = () => {
    onConfirm(value)
    onClose()
  }

  const handleDeny = () => {
    onDeny()
    onClose()
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleKey = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      onConfirm(value)
      onClose()
    }
  }

  const handleScroll = () => {
    if (open) onClose()
  }

  const handleTouch = () => {
    if (!isMoved.current) {
      isMoved.current = true
      return
    } else {
      if (open) onClose()
      isMoved.current = false
    }
  }

  useEffect(() => {
    window.addEventListener('wheel', handleScroll)
    window.addEventListener('touchmove', handleTouch)

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [open])

  return (
    <Portal>
      <AnimationWrapperAlwaysRendered open={open}>
        <div
          className={`editor-toolbar z-40 bg-white fixed md:absolute rounded border border-neutral-200 bg-white transition-opacity shadow`}
          style={{
            left: (position?.x || 0) + 'px',
            top: (position?.y || 0) + 'px',
          }}
          ref={ref}
        >
          <div className="flex p-0.5 gap-1" onKeyDown={handleKey}>
            <input
              ref={inputEl}
              type="text"
              name="link"
              className="outline-none px-2"
              value={value}
              onInput={handleInput}
            />
            <button
              className="rounded flex w-[36px] h-[36px] justify-center items-center text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-400 hover:text-theme transition-colors disabled:opacity-40"
              onClick={handleConfirm}
            >
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
            </button>
            <button
              className="rounded flex w-[36px] h-[36px] justify-center items-center text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-40"
              onClick={handleDeny}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </AnimationWrapperAlwaysRendered>
    </Portal>
  )
}

export default forwardRef(LinkInput)
