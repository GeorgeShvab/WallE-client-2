import { FC, MouseEvent, useRef, useState } from 'react'
import { $getRoot } from 'lexical'
import { useEffect } from 'react'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { AutoLinkPlugin, createLinkMatcherWithRegExp } from '@lexical/react/LexicalAutoLinkPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import './style.css'
import ToolbarPlugin from './ToolbarPlugin'
import { useAppDispatch } from '@/redux/store'
import { saveDocumentAsyncAction, setDocumentSavingState } from '@/redux/slices/document'
import { Document } from '@/types'
import debounce from '@/utils/debounce'
import { useNavigate } from 'react-router-dom'
import Dialog from '../UIKit/Dialog'

interface Props extends Document {
  isEditable: boolean
}

const linkRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

const Editor: FC<Props> = ({ id, markdown, isEditable }) => {
  const prevEditorState = useRef<string>(markdown)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [editor] = useLexicalComposerContext()

  const [isAuthNeededOpened, setIsAuthNeededOpened] = useState<boolean>(false)

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      const href = (e.target as HTMLAnchorElement)?.href

      window.open(href)
    }

    if ((e.target as HTMLElement).parentElement?.tagName === 'A') {
      const href = ((e.target as HTMLElement).parentElement as HTMLAnchorElement)?.href

      window.open(href)
    }
  }

  const updateDocument = debounce((plainText: string, markdown: string) => {
    dispatch(saveDocumentAsyncAction({ id, markdown, text: plainText }))
  }, 2500)

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      const editorStateJsonString = JSON.stringify(editorState.toJSON())

      const parsedEditorState = editor.parseEditorState(editorStateJsonString)

      const editorStateTextString = parsedEditorState.read(() => $getRoot().getTextContent())

      if (prevEditorState.current !== editorStateJsonString && editorStateTextString) {
        prevEditorState.current = editorStateJsonString

        dispatch(setDocumentSavingState({ isSaving: true }))

        updateDocument(editorStateTextString, JSON.stringify(editorState.toJSON()))
      }
    })

    return unregister
  }, [editor])

  const handleEditorClick = () => {
    const selection = window.getSelection()

    if (!isEditable && selection?.getRangeAt(0).collapsed) {
      setIsAuthNeededOpened(true)
    }
  }

  return (
    <div className={`flex flex-col min-h-full md:pb-6 md:pl-6 md:pr-6 p-2.5 ${isEditable ? 'pt-0' : 'md:pb-2.5'}`}>
      <Dialog
        open={isAuthNeededOpened}
        onClose={() => setIsAuthNeededOpened(false)}
        title={`Щоб редагувати документ, потрібно авторизуватися`}
        text="Перейти на сторінку авторизації?"
        confirmText="Перейти"
        severity="success"
        onConfirm={() => navigate('/signin')}
      />
      {isEditable && <ToolbarPlugin />}
      <div className={`flex-1 ${isEditable ? 'pt-2' : ''}`}>
        <div className={'rounded border h-full px-3 py-2'} onClick={handleEditorClick}>
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin matchers={[createLinkMatcherWithRegExp(linkRegex)]} />
          <RichTextPlugin
            contentEditable={<ContentEditable onClick={handleClick} />}
            placeholder={<></>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
        </div>
      </div>
    </div>
  )
}

export default Editor
