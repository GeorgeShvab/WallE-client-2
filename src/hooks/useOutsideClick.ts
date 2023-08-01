import { RefObject, useEffect } from 'react'

const useOutsideClick = (ref: RefObject<HTMLElement> | RefObject<HTMLElement>[], fn: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (Array.isArray(ref)) {
      let outside: boolean[] = []
      for (let item of ref) {
        if (item.current?.contains(e.target as Node)) {
          outside.push(false)
          return
        }
      }

      fn()
    } else {
      if (ref.current?.contains(e.target as Node)) return

      fn()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('contextmenu', handleClick)
    }
  }, [ref, fn])
}

export default useOutsideClick
