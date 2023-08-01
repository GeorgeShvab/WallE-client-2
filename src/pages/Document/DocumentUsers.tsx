import ShareDocument from '@/components/Document/ShareDocument'
import Avatars from '@/components/UIKit/Avatars'
import Button from '@/components/UIKit/Button'
import { FC, memo, useState } from 'react'
import { Document } from '@/types'
import IconButton from '@/components/UIKit/IconButton'

const DocumentUsers: FC<Document> = (props) => {
  const [isShareOpened, setIsShareOpened] = useState<boolean>(false)

  return (
    <>
      <div className="flex gap-3 hidden md:block ml-auto">
        <Avatars users={props.collaborators} key={JSON.stringify(props.collaborators)} />
      </div>
      <div className="flex gap-2">
        <ShareDocument open={isShareOpened} onClose={() => setIsShareOpened(false)} {...props} />
        <Button
          className="bg-theme w-fit hidden md:flex"
          color="theme"
          onClick={() => setIsShareOpened((prev) => !prev)}
        >
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Поділитись
          </>
        </Button>
        <IconButton className="md:hidden" color="theme" onClick={() => setIsShareOpened((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </IconButton>
      </div>
    </>
  )
}

export default memo(DocumentUsers)
