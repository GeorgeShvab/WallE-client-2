import { FC, useState } from 'react'
import Modal from '../UIKit/Modal'
import { useAppSelector } from '@/redux/store'
import { selectUser } from '@/redux/slices/user'
import Menu from './Menu'
import Interface from './Interface'
import Account from './Account'

interface Props {
  open: boolean
  onClose: () => void
}

export type Section = 'interface' | 'account'

const Settings: FC<Props> = ({ open, onClose }) => {
  const { user } = useAppSelector(selectUser)

  const [section, setSection] = useState<Section>('account')

  if (!user) return null

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white rounded overflow-hidden shadow md:w-full justify-center md:justify-between md:min-w-[630px] md:max-w-[800px] w-[95vw] flex flex-col md:flex-row md:h-[65vh] h-[80vh]">
        <Menu section={section} setSection={setSection} />
        <div className="h-full overflow-auto px-8 py-6 flex-1 pretty-scrollbar border md:border-l border-t">
          {section === 'interface' ? <Interface /> : <Account />}
        </div>
      </div>
    </Modal>
  )
}

export default Settings
