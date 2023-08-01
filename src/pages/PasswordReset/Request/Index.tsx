import { FC, useState } from 'react'
import Request from './Request'
import Finish from './Finish'
import useTitle from '@/hooks/useTitle'

const PasswordResetFinish: FC = () => {
  const [section, setSection] = useState<'request' | 'finish'>('request')

  useTitle('Скидання пароля')

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {section === 'request' ? <Request setSection={setSection} /> : <Finish />}
    </div>
  )
}

export default PasswordResetFinish
