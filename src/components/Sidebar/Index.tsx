import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { createDocumentAction } from '@/redux/slices/documents'
import Button from '../UIKit/Button'
import Avatar from '../UIKit/Avatar'
import Settings from '../Settings/Index'
import Files from './Files'
import { selectUser } from '@/redux/slices/user'

const Sidebar: FC = () => {
  const dispatch = useAppDispatch()

  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false)

  const { user } = useAppSelector(selectUser)

  return (
    <aside className="pt-[14px] w-[280px] h-screen">
      <div className="px-4 justify-between flex">
        <h1 className="font-calistoga text-2xl">WallE</h1>
        <Avatar url={user?.avatar} className="h-8 w-8 cursor-pointer" onClick={() => setIsSettingsOpened(true)} />
        <Settings open={isSettingsOpened} onClose={() => setIsSettingsOpened(false)} />
      </div>
      <div className="px-4 my-5">
        <Button color="theme" className="w-full" onClick={() => dispatch(createDocumentAction())}>
          Новий запис
        </Button>
      </div>
      <Files />
    </aside>
  )
}

export default Sidebar
