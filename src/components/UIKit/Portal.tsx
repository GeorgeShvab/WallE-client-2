import { FC, ReactElement } from 'react'
import { createPortal } from 'react-dom'

const Portal: FC<{ children: ReactElement }> = ({ children }) => {
  return createPortal(<div>{children}</div>, document.getElementById('portal') as HTMLElement)
}

export default Portal
