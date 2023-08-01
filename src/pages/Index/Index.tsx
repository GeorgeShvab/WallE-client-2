import AuthProtection from '@/components/AuthProtection'
import Button from '@/components/UIKit/Button'
import useTitle from '@/hooks/useTitle'
import { createDocumentAction } from '@/redux/slices/documents'
import { useAppDispatch } from '@/redux/store'
import { FC } from 'react'

const Index: FC = () => {
  const dispatch = useAppDispatch()

  useTitle('WallE')

  const handleCreateDocument = () => {
    dispatch(createDocumentAction())
  }

  return (
    <AuthProtection redirect>
      <div className="flex justify-center items-center h-screen gap-2 flex-col px-6">
        <p className="text-black-main text-sm text-center">Створіть новий документ, або відкрийте один з наявних</p>
        <Button color="theme" variant="text" onClick={handleCreateDocument}>
          Створити новий документ
        </Button>
      </div>
    </AuthProtection>
  )
}

export default Index
