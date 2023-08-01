import { getSavesAsyncAction, selectSaves } from '@/redux/slices/saves'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getLocalStorage } from '@/utils/localstorage'
import { useEffect } from 'react'

const useSaves = () => {
  const dispacth = useAppDispatch()

  useEffect(() => {
    dispacth(getSavesAsyncAction())
  }, [])

  const data = useAppSelector(selectSaves)

  const localSaves = getLocalStorage().saves

  let saves

  if (data.loadingState.isSuccess) {
    saves = data.saves
  } else {
    saves = localSaves
  }

  return { ...data, saves: saves }
}

export default useSaves
