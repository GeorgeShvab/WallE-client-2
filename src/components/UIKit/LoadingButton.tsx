import Button from './Button'
import CircleLoading from './CircleLoading'

import { ReactElement, ButtonHTMLAttributes, forwardRef, ForwardRefRenderFunction } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  children: string | ReactElement
  fullWidth?: boolean
  color?: 'black' | 'theme'
  isLoading: boolean
}

const LoadingButton: ForwardRefRenderFunction<HTMLElement, Props> = ({ isLoading, children, ...props }, ref) => {
  return (
    <Button {...props} ref={ref}>
      {isLoading ? <CircleLoading className="text-white" /> : children}
    </Button>
  )
}

export default forwardRef(LoadingButton)
