import { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from './Header'
import useDocument from '@/hooks/useDocument'
import Editor from '@/components/Editor/Index'
import { CodeNode } from '@lexical/code'
import { LinkNode, AutoLinkNode } from '@lexical/link'
import { ListNode, ListItemNode } from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import ErrorBoundary from '@/components/ErrorBoundary'
import ErrorFallback from './ErrorFallback'
import useHandleError from '@/hooks/useHandleError'
import DocumentLoader from './DocumentLoader'
import useMe from '@/hooks/useMe'
import useTitle from '@/hooks/useTitle'

const EDITOR_NODES = [CodeNode, LinkNode, ListNode, ListItemNode, AutoLinkNode]

const initialConfig = {
  namespace: 'MyEditor',
  nodes: EDITOR_NODES,
  theme: {
    root: 'outline-none editor-root h-full',
    text: {
      bold: 'font-semibold',
      underline: 'editor-text-underline',
      italic: 'italic',
      strikethrough: 'editor-text-strikethought',
      underlineStrikethrough: 'editor-text-underline-strikethought',
    },
    link: 'editor-link',
    list: {
      ul: 'editor-ul-list',
      ol: 'editor-ol-list',
    },
  },
  onError: (e: any) => console.log(e),
}

const DocumentContainer: FC = () => {
  const handleError = useHandleError()

  const { user } = useMe()

  const { document } = useParams()

  const data = useDocument(document || '', {
    onError: handleError,
  })

  useTitle(data.document?.title)

  if (data.loadingState.isLoading && !data.document) {
    return <DocumentLoader />
  }

  return (
    <div className="flex flex-col">
      {data.document && (
        <LexicalComposer
          key={data.document.id + data.loadingState.isLoading}
          initialConfig={{
            ...initialConfig,
            theme: { ...initialConfig.theme, root: initialConfig.theme.root + (user ? ' editable' : '') },
            editable: !!user,
            editorState: data.document.markdown || null,
          }}
        >
          <>
            <Header isEditable={!!user} document={data.document} savingState={data.savingState} />
            <div className="flex-[3_0_calc(100vh-60.8px)] overflow-auto pretty-scrollbar">
              <Editor isEditable={!!user} {...data.document} />
            </div>
          </>
        </LexicalComposer>
      )}
    </div>
  )
}

const Document: FC = () => {
  const { pathname } = useLocation()

  return (
    <ErrorBoundary key={pathname} fallback={(error) => <ErrorFallback error={error} />}>
      <DocumentContainer />
    </ErrorBoundary>
  )
}

export default Document
