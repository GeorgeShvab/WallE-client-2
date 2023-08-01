import { FC, useState } from 'react'
import Choice from './Choice'
import FirstStep from './FirstStep'
import UnauthProtection from '@/components/UnauthProtection'
import useTitle from '@/hooks/useTitle'

const Signin: FC = () => {
  const [section, setSection] = useState<'choice' | 'first_step'>('choice')

  useTitle('Вхід')

  return (
    <UnauthProtection redirect>
      <div className="h-screen w-screen flex justify-center items-center">
        {section === 'first_step' ? <FirstStep setSection={setSection} /> : <Choice setSection={setSection} />}
      </div>
    </UnauthProtection>
  )
}

export default Signin
