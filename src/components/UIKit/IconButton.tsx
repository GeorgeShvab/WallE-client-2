import { ReactElement, ButtonHTMLAttributes, forwardRef, ForwardRefRenderFunction } from 'react'
import { Link } from 'react-router-dom'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  children: string | ReactElement
  fullWidth?: boolean
  color?: 'grey' | 'theme'
  href?: string
  variant?: 'outlined' | 'contained' | 'text'
}

const Button: ForwardRefRenderFunction<HTMLElement, Props> = (
  { children, className, fullWidth, href, variant = 'contained', color = 'grey', ...attributes },
  ref
) => {
  let style =
    'rounded flex w-10 h-10 justify-center items-center text-sm transition-all disabled:opacity-40 disabled:pointer-events-none '

  switch (variant) {
    case 'contained':
      if (color === 'grey') {
        style += 'bg-neutral-100 hover:bg-neutral-200 text-neutral-400 hover:text-theme'
      } else {
        style += 'text-white bg-theme hover:bg-[#efefef] hover:text-theme'
      }
      break
    case 'outlined':
      if (color === 'grey') {
        style += 'text-neutral-400 bg-transparent border-2 border-neutral-100 hover:border-neutral-200 hover:text-theme'
      } else {
        style += 'text-theme bg-transparent border-2 border-theme hover:border-[#efefef] hover:text-[#efefef]'
      }
      break
    case 'text':
      if (color === 'grey') {
        style += 'text-neutral-400 hover:text-theme'
      } else {
        style += 'text-theme hover:text-[#efefef]'
      }
      break
  }

  if (href) {
    return (
      <Link to={href} className={`${style} ${className}`} ref={ref as any} {...attributes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={`${style} ${className}`} ref={ref as any} {...attributes}>
      {children}
    </button>
  )
}

export default forwardRef(Button)
