import { FC, ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  url: string | null | undefined
  className?: string
  hoverEffect?: boolean
}

const Avatar: FC<Props> = ({ url, className, hoverEffect = true, ...attributes }) => {
  return (
    <img
      src={url || `${import.meta.env.VITE_APP_SERVER_ADDRESS}/static/default-avatar.jpg`}
      className={`object-cover h-10 w-10 rounded-full overflow-hidden outline outline-2 outline-neutral-50 transition-all ${
        hoverEffect ? 'hover:scale-110' : ''
      } ${className}`}
      alt={'avatar'}
      {...attributes}
    />
  )
}

export default Avatar
