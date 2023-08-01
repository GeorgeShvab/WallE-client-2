import { FC, useState } from 'react'
import Form from './Form'
import Finish from './Finish'
import TokenError from './TokenError'
import useTitle from '@/hooks/useTitle'

const PasswordResetRequest: FC = () => {
  const [section, setSection] = useState<'form' | 'finish' | 'error'>('form')

  useTitle('Зкидання пароля')

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {section === 'form' ? <Form setSection={setSection} /> : section === 'finish' ? <Finish /> : <TokenError />}
    </div>
  )
}

export default PasswordResetRequest
