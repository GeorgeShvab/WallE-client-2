import { FC } from 'react'
import NameUpdation from './NameUpdation'
import { selectUser } from '@/redux/slices/user'
import { useAppSelector } from '@/redux/store'
import PasswordUpdation from './PasswordUpdation'
import AvatarUpdation from './AvatarUpdation'
import Signout from './Signout'

const Account: FC = () => {
  const { user } = useAppSelector(selectUser)

  if (!user) return

  return (
    <div>
      <AvatarUpdation {...user} />
      <NameUpdation {...user} />
      <PasswordUpdation />
      <Signout />
    </div>
  )
}

export default Account
