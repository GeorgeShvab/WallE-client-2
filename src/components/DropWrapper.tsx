import { FC, createElement, memo, useEffect, useState } from 'react'
import * as types from '@/types'
import { DropTargetMonitor, useDrop } from 'react-dnd'

interface Props {
  container: keyof HTMLElementTagNameMap
  render: FC<{ documents: types.Document[]; onDrop: (doc: types.Document) => void }>
  documents: types.Document[]
  onDrop?: (document: types.Document) => void
  className?: string
}

const DropWrapper: FC<Props> = ({ container, render, onDrop, className, documents: docs }) => {
  const [documents, setDocuments] = useState<types.Document[]>(docs)

  useEffect(() => {
    setDocuments(docs)
  }, [docs])

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: 'document',
      drop(item: types.Document) {
        onDrop && onDrop(item)
        setDocuments((prev) => [item, ...prev])

        return item
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      canDrop: (item) => {
        return !documents.find((doc) => item.id === doc.id)
      },
    }),
    [documents]
  )

  const handleRemove = (doc: types.Document) => {
    setDocuments((prev) => prev.filter((item) => item.id !== doc.id))
  }

  return createElement(
    container,
    { ref: drop, className: `rounded transition-colors ${collectedProps.isOver ? 'bg-[#efefef]' : ''} ${className}` },
    render({ documents, onDrop: handleRemove })
  )
}

export default memo(DropWrapper)
