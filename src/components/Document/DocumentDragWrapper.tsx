import * as types from '@/types'
import { FC, ReactElement, createElement, memo, useEffect, useRef, useState } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import DocumentDragPreview from './DocumentDragPreview'
import useMediaQuery from '@/hooks/useMediaQuery'
import useOutsideClick from '@/hooks/useOutsideClick'

interface Props extends types.Document {
  container: string
  onDrop?: (item: types.Document) => void
  choosed?: boolean
  onDrag?: (item: types.Document) => void
  children: ReactElement
  onStopDragging?: (item: types.Document) => void
}

const DocumentDragWrapper: FC<Props> = (props) => {
  const { container, onDrop, onDrag, onStopDragging, choosed, children, ...doc } = props

  const time = useRef<number>()

  const containerElement = useRef<HTMLDivElement>(null)

  const [isDragAllowed, setIsDragAllowed] = useState<boolean>(window.innerWidth > 768)

  const isMobile = useMediaQuery(0, 769)

  useEffect(() => {
    if (isMobile) {
      setIsDragAllowed(false)
    } else {
      setIsDragAllowed(true)
    }
  }, [isMobile])

  const [isDropped, setIsDropped] = useState<boolean>(false)

  const [collected, drag] = useDrag(
    () => ({
      type: 'document',
      item: doc,
      canDrag: isDragAllowed || window.innerWidth > 768,
      collect: (monitor: DragSourceMonitor) => {
        return {
          isDragging: monitor.isDragging(),
          position: monitor.getSourceClientOffset() || { x: 0, y: 0 },
        }
      },
      end: (item: types.Document, monitor: DragSourceMonitor) => {
        if (monitor.didDrop()) {
          setIsDropped(true)
          onDrop && onDrop(doc)
        }

        return item
      },
    }),
    [doc, isDragAllowed]
  )

  const handleTouchStart = () => {
    time.current = setTimeout(() => {
      setIsDragAllowed(true)
    }, 150)
  }

  const handleTouchMove = () => {
    clearTimeout(time.current)
  }

  useOutsideClick(containerElement, () => setIsDragAllowed(false))

  return createElement(
    props.container,
    {
      ref: drag,
      className: `transition-all`,
    },
    <div
      className={`h-10 ${collected.isDragging || isDropped ? 'opacity-0' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      ref={containerElement}
    >
      {collected.isDragging && <DocumentDragPreview {...doc} x={collected.position.x} y={collected.position.y} />}
      {children}
    </div>
  )
}

export default memo(DocumentDragWrapper)
