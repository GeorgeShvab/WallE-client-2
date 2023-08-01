import { useEffect, useState } from 'react'

const useMediaQuery = (min: number, max: number) => {
  const [width, setWidth] = useState<number>(window.innerWidth)

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (width > min && width < max) return true

  return false
}

export default useMediaQuery
