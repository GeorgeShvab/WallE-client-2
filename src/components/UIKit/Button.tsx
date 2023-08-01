import { ReactElement, ButtonHTMLAttributes, forwardRef, ForwardRefRenderFunction } from 'react'
import { Link } from 'react-router-dom'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  children: string | ReactElement
  fullWidth?: boolean
  color?: 'black' | 'theme'
  href?: string
  variant?: 'outlined' | 'contained' | 'text'
}

const Button: ForwardRefRenderFunction<HTMLElement, Props> = (
  { children, className, fullWidth, href, variant = 'contained', color = 'black', ...attributes },
  ref
) => {
  let style =
    'block rounded px-6 flex gap-4 justify-center items-center text-sm h-10 transition-all disabled:opacity-40 disabled:pointer-events-none '

  switch (variant) {
    case 'contained':
      if (color === 'black') {
        style += 'bg-black-main text-white hover:bg-black-light'
      } else {
        style += 'text-white bg-theme hover:bg-[#efefef] hover:text-theme'
      }
      break
    case 'outlined':
      if (color === 'black') {
        style +=
          'text-black-main bg-transparent border-2 border-black-main hover:border-black-light hover:text-black-light'
      } else {
        style += 'text-theme bg-transparent border-2 border-theme hover:border-[#efefef] hover:text-[#efefef]'
      }
      break
    case 'text':
      if (color === 'black') {
        style += 'text-black-main hover:text-black-light'
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
