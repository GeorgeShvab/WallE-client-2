import { User } from '@/types'
import { FC, useState } from 'react'
import Avatar from './Avatar'
import Tooltip from './Tooltip'

interface Props {
  users: User[]
}

interface Avatars {
  users: User[]
  hovered: number | undefined
}

const Avatars: FC<Props> = ({ users }) => {
  const [state, setState] = useState<Avatars>({ hovered: undefined, users: users.slice(0, 6) })

  const handleEnter = (id: number) => {
    setState((prev) => ({ ...prev, hovered: id }))
  }

  const handleLeave = (id: number) => {
    setState((prev) => ({ ...prev, hovered: undefined }))
  }

  return (
    <div className="flex gap-2 flex-row-reverse relative h-10" style={{ width: users.length * 28.2 + 'px' }}>
      {state.users.map((item, index) => {
        let right = index * 25

        if (state.hovered !== undefined) {
          if (state.hovered < index) {
            if (state.hovered) {
              right += 40
            } else {
              right += 20
            }
          } else if (state.hovered === index && index) {
            right += 20
          }
        }

        return (
          <div
            className={`absolute transition-all w-10 flex justify-center last:justify-end`}
            style={{ right: right + 'px' }}
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={() => handleLeave(index)}
            key={index}
          >
            <Tooltip text={item.name}>
              <Avatar url={item.avatar} />
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}

export default Avatars
