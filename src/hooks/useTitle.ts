import { useEffect } from 'react'

const useTitle = (title: string | undefined) => {
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])
}

export default useTitle
