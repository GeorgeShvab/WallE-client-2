import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FC, useEffect, useRef, useState } from 'react'
import Portal from '../UIKit/Portal'
import ToolBar from './ToolBar'
import { $getSelection, $isRangeSelection, ElementNode, FORMAT_TEXT_COMMAND, RangeSelection, TextNode } from 'lexical'
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isAtNodeEnd } from '@lexical/selection'
import LinkInput from './LinkInput'
import useOutsideClick from '@/hooks/useOutsideClick'
import { AnimationWrapperAlwaysRendered } from '../AnimationWrapper'
import useClosest from '@/hooks/useClosest'
import useMediaQuery from '@/hooks/useMediaQuery'

interface Position {
  x: number
  y: number
}

interface State {
  isBold: boolean
  isCode: boolean
  isItalic: boolean
  isStrikethrough: boolean
  isUnderline: boolean
  isLink: boolean
}

interface FloatingToolbarState {
  position: Position
  isFloatingToolbarOpened: boolean
}

interface LinkInputState {
  value: string
  isLinkInputOpened: boolean
}

export function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode
  }
}

const ToolbarPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  const isMobile = useMediaQuery(0, 769)

  const [linkInputState, setLinkInputState] = useState<LinkInputState>({ value: '', isLinkInputOpened: false })

  const [state, setState] = useState<State>({
    isBold: false,
    isCode: false,
    isItalic: false,
    isStrikethrough: false,
    isUnderline: false,
    isLink: false,
  })

  const [floatingToolbarState, setFloatingToolbarState] = useState<FloatingToolbarState>({
    position: { x: 0, y: 0 },
    isFloatingToolbarOpened: false,
  })

  const toolbarRef = useRef<HTMLDivElement>(null)

  const linkInputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection() as RangeSelection

        const windowSelection = window.getSelection()

        if (!selection) {
          setFloatingToolbarState((prev) => ({ ...prev, isFloatingToolbarOpened: false }))
          return
        }

        const boundingClientRect = windowSelection?.getRangeAt(0).getBoundingClientRect()

        if (!boundingClientRect?.x || !boundingClientRect?.y || !toolbarRef.current) {
          setFloatingToolbarState((prev) => ({ ...prev, isFloatingToolbarOpened: false }))

          setState({
            isBold: selection.hasFormat('bold'),
            isCode: selection.hasFormat('code'),
            isItalic: selection.hasFormat('italic'),
            isStrikethrough: selection.hasFormat('strikethrough'),
            isUnderline: selection.hasFormat('underline'),
            isLink: false,
          })

          return
        }

        if ($isRangeSelection(selection) && !selection.anchor.is(selection.focus)) {
          const node = getSelectedNode(selection)
          const parent = node.getParent()

          setState({
            isBold: selection.hasFormat('bold'),
            isCode: selection.hasFormat('code'),
            isItalic: selection.hasFormat('italic'),
            isStrikethrough: selection.hasFormat('strikethrough'),
            isUnderline: selection.hasFormat('underline'),
            isLink: !!($isLinkNode(parent) || $isLinkNode(node)),
          })

          const x =
            boundingClientRect.left -
            toolbarRef.current.getBoundingClientRect().width / 2 +
            boundingClientRect.width / 2

          const y = boundingClientRect.top - toolbarRef.current.getBoundingClientRect().height

          setLinkInputState((prev) => ({ ...prev, value: parent.__url || '' }))

          setFloatingToolbarState({ position: { x, y }, isFloatingToolbarOpened: true })
        } else {
          setState({
            isBold: selection.hasFormat('bold'),
            isCode: selection.hasFormat('code'),
            isItalic: selection.hasFormat('italic'),
            isStrikethrough: selection.hasFormat('strikethrough'),
            isUnderline: selection.hasFormat('underline'),
            isLink: false,
          })
          setFloatingToolbarState((prev) => ({ ...prev, isFloatingToolbarOpened: false }))
        }
      })
    })
    return unregisterListener
  }, [editor])

  useClosest('.editor-root, .editor-toolbar', () =>
    setFloatingToolbarState((prev) => ({ ...prev, isFloatingToolbarOpened: false }))
  )

  const handleBold = () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')

  const handleItalic = () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')

  const handleUnderline = () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')

  const handleStrikethrough = () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')

  const handleUnorderedList = () => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)

  const handleOrderedList = () => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)

  const handleLink = () => {
    setLinkInputState((prev) => ({ ...prev, isLinkInputOpened: true }))

    setFloatingToolbarState((prev) => ({ ...prev, isFloatingToolbarOpened: false }))
  }

  const handleConfirmLink = (value: string) => {
    let href = value

    if (!/http:\/\/|https:\/\//.test(value)) {
      href = `https://${value}`
    }

    editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: href })
  }

  const handleDenyLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
  }

  useOutsideClick([linkInputRef, toolbarRef], () => {
    if (linkInputState.isLinkInputOpened) {
      setLinkInputState((prev) => ({ ...prev, isLinkInputOpened: false }))
    }
  })

  const handleCloseLinkInput = () => {
    setLinkInputState((prev) => ({ ...prev, isLinkInputOpened: false }))
  }

  let linkInputX

  let linkInputY

  if (isMobile) {
    linkInputX = window.screen.width / 2 - (linkInputRef.current?.getBoundingClientRect().width || 0) / 2

    linkInputY = floatingToolbarState.position.y + 25
  } else {
    linkInputX =
      (toolbarRef.current?.getBoundingClientRect().width || 0) / 2 +
      floatingToolbarState.position.x -
      (linkInputRef.current?.getBoundingClientRect().width || 0) / 2

    linkInputY = floatingToolbarState.position.y
  }

  return (
    <>
      <div className="sticky top-0 bg-white z-10 pt-4 rounded">
        <ToolBar
          onBold={handleBold}
          state={state}
          onItalic={handleItalic}
          onUnderline={handleUnderline}
          onStrikethrough={handleStrikethrough}
          onOrderedList={handleOrderedList}
          onUnorderedList={handleUnorderedList}
          onLink={handleLink}
        />
      </div>
      <Portal>
        <AnimationWrapperAlwaysRendered className="z-40" open={floatingToolbarState.isFloatingToolbarOpened}>
          <div
            className="absolute shadow rounded editor-toolbar hidden md:block"
            style={{
              left: floatingToolbarState.position.x,
              top: floatingToolbarState.position.y,
            }}
          >
            <ToolBar
              ref={toolbarRef}
              onBold={handleBold}
              state={state}
              onItalic={handleItalic}
              onUnderline={handleUnderline}
              onStrikethrough={handleStrikethrough}
              onOrderedList={handleOrderedList}
              onUnorderedList={handleUnorderedList}
              onLink={handleLink}
            />
          </div>
        </AnimationWrapperAlwaysRendered>
      </Portal>
      <LinkInput
        open={linkInputState.isLinkInputOpened}
        defaultValue={linkInputState.value}
        ref={linkInputRef}
        position={{
          x: linkInputX,
          y: linkInputY,
        }}
        onClose={handleCloseLinkInput}
        onDeny={handleDenyLink}
        onConfirm={handleConfirmLink}
      />
    </>
  )
}

export default ToolbarPlugin
