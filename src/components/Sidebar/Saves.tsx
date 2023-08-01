import useSaves from '@/hooks/useSaves'
import { FC, memo } from 'react'
import Documents from '../Document/Documents'

const Saves: FC = () => {
  const saves = useSaves()

  return (
    <div
      className="overflow-hidden duration-300 transition-all"
      style={{ height: saves.saves.length ? saves.saves.length * 40 + 64 + 'px' : '0' }}
    >
      <div>
        <div className="flex justify-between items-center mb-2 py-0.5 px-4">
          <h3 className="text-sm text-neutral-500 font-medium">Обране</h3>
        </div>
        <div className="px-2">{saves.saves && <Documents documents={saves.saves} />}</div>
      </div>
      <div className="px-4">
        <hr className="h-px bg-neutral-300 my-4" />
      </div>
    </div>
  )
}

export default memo(Saves)
