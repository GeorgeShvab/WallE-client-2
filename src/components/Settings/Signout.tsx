import useSignout from '@/hooks/useSignout'
import Button from '../UIKit/Button'

const Signout = () => {
  const signout = useSignout()

  return (
    <div>
      <h3 className="text-black-main text-sm mb-6 font-medium">Вихід з акканута на цьому пристрої</h3>
      <div className="flex flex-col items-center gap-2.5">
        <Button
          className="w-full bg-transparent !text-red-600 border-2 hover:!bg-red-600 hover:!text-white !border-red-600"
          onClick={signout}
        >
          Вийти з акканута
        </Button>
      </div>
    </div>
  )
}

export default Signout
