import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import PersistReduxStorage from './components/PersistReduxStorage.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistReduxStorage>
        <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </DndProvider>
      </PersistReduxStorage>
    </Provider>
  </BrowserRouter>
)
