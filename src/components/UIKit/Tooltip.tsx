import { FC, ReactElement } from 'react'

interface Props {
  children: ReactElement | string
  text: string
}

const Tooltip: FC<Props> = ({ children, text }) => {
  return (
    <div className={`relative group`}>
      {children}
      <span
        className={`z-30 absolute px-2 py-1 rounded bg-white shadow top-full right-1/2 translate-x-1/2 text-sm opacity-0 break-normal whitespace-nowrap transition-all opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-event-auto group-hover:translate-y-2`}
      >
        {text}
      </span>
    </div>
  )
}

export default Tooltip
