import { FC, ReactElement, useEffect, useRef, useState, RefObject, useLayoutEffect } from 'react'
import Portal from './Portal'
import useOutsideClick from '@/hooks/useOutsideClick'
import AnimationWrapper, { AnimationWrapperAlwaysRendered } from '../AnimationWrapper'

interface Position {
  top: number
  left: number
}

interface Props {
  anchor: RefObject<HTMLElement>
  children: ReactElement
  open: boolean
  onClose: () => void
  menuPosition?: MenuPosition
  closeOnMenuClick?: boolean
}

type MenuPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'left-top'
  | 'left-bottom'
  | 'left-center'
  | 'right-top'
  | 'right-bottom'
  | 'right-center'

const ContextMenu: FC<Props> = ({
  anchor,
  children,
  open,
  onClose,
  menuPosition = 'right-center',
  closeOnMenuClick = true,
}) => {
  const containerEl = useRef<HTMLDivElement>(null)

  let isMoved = false

  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
  })

  const calculatePos = () => {
    if (containerEl.current && anchor.current) {
      const anchorPosiion = anchor.current.getBoundingClientRect()
      const containerPosition = containerEl.current.getBoundingClientRect()

      let top = 0
      let left = 0

      if (menuPosition === 'right-center' && window.screen.width < anchorPosiion.right + containerPosition.width) {
        menuPosition = 'bottom-center'
      }

      if (menuPosition === 'bottom-right' && window.screen.width < anchorPosiion.left + containerPosition.width) {
        menuPosition = 'bottom-left'
      }

      if (menuPosition === 'bottom-center' && window.screen.height < anchorPosiion.bottom + containerPosition.height) {
        menuPosition = 'top-center'
      }

      if (menuPosition === 'right-center') {
        left = anchorPosiion.right
        top = anchorPosiion.height / 2 + anchorPosiion.top - containerPosition.height / 2
      } else if (menuPosition === 'right-top') {
        left = anchorPosiion.right
        top = anchorPosiion.top - containerPosition.height
      } else if (menuPosition === 'right-bottom') {
        left = anchorPosiion.right
        top = anchorPosiion.bottom
      } else if (menuPosition === 'left-center') {
        left = anchorPosiion.left
        top = anchorPosiion.height / 2 + anchorPosiion.top - containerPosition.height / 2
      } else if (menuPosition === 'left-top') {
        left = anchorPosiion.left
        top = anchorPosiion.top - containerPosition.height
      } else if (menuPosition === 'left-bottom') {
        left = anchorPosiion.left
        top = anchorPosiion.bottom
      } else if (menuPosition === 'top-center') {
        left = anchorPosiion.width / 2 + anchorPosiion.left - containerPosition.width / 2
        top = anchorPosiion.top - containerPosition.height
      } else if (menuPosition === 'top-left') {
        left = anchorPosiion.right - containerPosition.width
        top = anchorPosiion.top - containerPosition.height
      } else if (menuPosition === 'top-right') {
        left = anchorPosiion.left
        top = anchorPosiion.top - containerPosition.height
      } else if (menuPosition === 'bottom-center') {
        left = anchorPosiion.width / 2 + anchorPosiion.left - containerPosition.width / 2
        top = anchorPosiion.bottom
      } else if (menuPosition === 'bottom-left') {
        left = anchorPosiion.right - containerPosition.width
        top = anchorPosiion.bottom
      } else if (menuPosition === 'bottom-right') {
        left = anchorPosiion.left
        top = anchorPosiion.bottom
      }

      setPosition({ left, top })
    }
  }

  useLayoutEffect(() => {
    calculatePos()
  }, [open])

  const handleScroll = () => {
    if (open) onClose()
  }

  const handleTouch = () => {
    if (!isMoved) {
      isMoved = true
      return
    } else {
      if (open) onClose()
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

  useOutsideClick(closeOnMenuClick ? anchor : [anchor, containerEl], () => onClose())

  return (
    <Portal>
      <AnimationWrapperAlwaysRendered className="z-40" open={open} ms={150}>
        <div className={`absolute`} ref={containerEl} style={{ left: position.left + 'px', top: position.top + 'px' }}>
          {children}
        </div>
      </AnimationWrapperAlwaysRendered>
    </Portal>
  )
}

export default ContextMenu
