import { User } from '@/types'
import { ChangeEvent, FC, useRef } from 'react'
import Avatar from '../UIKit/Avatar'
import { updateAvatarAsyncAction, removeAvatarAsyncAction } from '@/redux/slices/user'
import { useAppDispatch } from '@/redux/store'
import Button from '../UIKit/Button'

const AvatarUpdation: FC<User> = ({ avatar }) => {
  const dispatch = useAppDispatch()

  const inputEl = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined

    if (!file) return

    const formData = new FormData()

    formData.append('image', file)

    dispatch(updateAvatarAsyncAction(formData))
  }

  const handleRemove = () => {
    dispatch(removeAvatarAsyncAction())
  }

  return (
    <div className="mb-10">
      <h3 className="text-black-main text-sm mb-6 font-medium">Зміна аватара</h3>
      <div className="flex gap-2 md:gap-6 items-center justify-between md:max-w-[290px]">
        <Avatar url={avatar} hoverEffect={false} className="h-20 w-20 shadow" />
        <input name="image" type="file" accept=".jpg, .png, .jpeg" onChange={handleSubmit} ref={inputEl} hidden />
        <div className="flex gap-1.5">
          <Button color="theme" onClick={() => inputEl.current?.click()}>
            Новий аватар
          </Button>
          <button
            className="w-10 h-10 flex items-center justify-center bg-red-400 hover:bg-red-200 transition-colors rounded text-white"
            title="Видалити аватар"
            onClick={handleRemove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvatarUpdation
