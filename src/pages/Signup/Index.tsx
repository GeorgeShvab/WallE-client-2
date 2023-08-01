import { FC, useState } from 'react'
import Choice from './Choice'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import Finish from './Finish'
import UnauthProtection from '@/components/UnauthProtection'
import useTitle from '@/hooks/useTitle'

interface UserData {
  name: string
  userName: string
  email: string
  password: string
}

const Signup: FC = () => {
  const [section, setSection] = useState<'choice' | 'first_step' | 'second_step' | 'finish'>('choice')

  useTitle('Реєстрація')

  const [data, setData] = useState<UserData>({
    name: '',
    userName: '',
    email: '',
    password: '',
  })

  const setUserData = (param: Partial<UserData>) => {
    setData((prev) => ({ ...prev, ...param }))
  }

  return (
    <UnauthProtection redirect>
      <div className="h-screen w-screen flex justify-center items-center">
        {section === 'first_step' ? (
          <FirstStep setSection={setSection} user={data} setUser={setUserData} />
        ) : section === 'second_step' ? (
          <SecondStep setSection={setSection} user={data} setUser={setUserData} />
        ) : section === 'finish' ? (
          <Finish />
        ) : (
          <Choice setSection={setSection} />
        )}
      </div>
    </UnauthProtection>
  )
}

export default Signup
