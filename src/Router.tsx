import { FC } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Signin from './pages/Signin/Index'
import Signup from './pages/Signup/Index'
import Confirmation from './pages/Signup/Confirmation'
import PasswordResetRequest from './pages/PasswordReset/Request/Index'
import PasswordResetFinish from './pages/PasswordReset/NewPassword/Index'
import Layout from './components/Layout'
import Document from './pages/Document/Index'
import Index from './pages/Index/Index'
import PageNotFound from './pages/404'

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/confirmation" element={<Confirmation />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/password-reset/request" element={<PasswordResetRequest />} />
      <Route path="/password-reset" element={<PasswordResetFinish />} />
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/" element={<Index />} />
        <Route path="documents/:document" element={<Document />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Router
