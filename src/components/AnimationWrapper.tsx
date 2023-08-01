import { FC, useEffect, ReactElement, useRef, useState, useLayoutEffect } from 'react'

interface AnimationWrapperAlwaysRenderedProps {
  open: boolean
  ms?: number
  children: ReactElement
  className?: string
}

export const AnimationWrapperAlwaysRendered: FC<AnimationWrapperAlwaysRenderedProps> = ({
  open,
  children,
  ms = 150,
  className,
}) => {
  const time = useRef<number>()

  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    if (open) {
      clearTimeout(time.current)

      setIsMounted(true)
    } else {
      time.current = setTimeout(() => {
        setIsMounted(false)
      }, ms)
    }
  }, [open])

  return (
    <div className={`absolute ${isMounted ? 'visible' : 'invisible'} ${className ? className : ''}`}>
      <div className={`transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}>{children}</div>
    </div>
  )
}

interface Props {
  open: boolean
  ms?: number
  children: ReactElement
  className?: string
  onRendered?: () => void
  stateClassNames?: {
    open?: string
    close?: string
    default?: string
  }
}

export const AnimationWrapper: FC<Props> = ({ open, children, ms = 150, className, stateClassNames, onRendered }) => {
  const time = useRef<number>()

  const [state, setState] = useState<boolean>(false)

  const [isMounted, setIsMounted] = useState<boolean>(false)

  useLayoutEffect(() => {
    if (open) {
      clearTimeout(time.current)

      setIsMounted(true)
    } else {
      setState(false)
      time.current = setTimeout(() => {
        setIsMounted(false)
      }, ms)
    }
  }, [open])

  useEffect(() => {
    if (isMounted) {
      setState(true)
      onRendered && onRendered()
    }
  }, [isMounted])

  if (!isMounted) return null

  return (
    <div className={`absolute ${className ? className : ''}`}>
      <div
        className={`${stateClassNames?.default || ''} ${
          state ? stateClassNames?.open || '' : stateClassNames?.close || ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default AnimationWrapper
