import { useState, useEffect } from 'react'

const useHandleError = () => {
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return setError
}

export default useHandleError
