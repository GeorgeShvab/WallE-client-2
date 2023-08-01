import { useEffect } from 'react'

const useClosest = (selector: string, fn: () => void) => {
  const handelClick = (e: MouseEvent) => {
    if (!(e.target as Element).closest(selector)) {
      fn()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handelClick)

    return () => {
      document.removeEventListener('click', handelClick)
    }
  }, [selector, fn])
}

export default useClosest
