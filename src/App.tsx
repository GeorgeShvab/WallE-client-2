import Router from './Router'
import ReduxAlert from './components/ReduxAlert'
import useLoadUser from './hooks/useLoadUser'

function App() {
  useLoadUser()

  return (
    <div className="bg-neutral-50 font-rubik">
      <ReduxAlert />
      <Router />
    </div>
  )
}

export default App
