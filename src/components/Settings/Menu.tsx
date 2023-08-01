import { FC } from 'react'
import { Section } from './Index'

interface Props {
  section: Section
  setSection: (arg: Section) => void
}

const Menu: FC<Props> = ({ section, setSection }) => {
  return (
    <div className="px-6 md:px-8 py-6">
      <h3 className="text-lg mb-6 font-medium text-center">Налаштування</h3>
      <ul>
        <li
          className={`text-sm flex items-center justify-center h-10 px-4 py-2 rounded transition-colors mb-1 ${
            section === 'account' ? 'bg-neutral-100' : 'hover:bg-neutral-50'
          }`}
          onClick={() => setSection('account')}
          role="button"
        >
          Налаштування аккаунта
        </li>
        <li
          className={`text-sm flex items-center justify-center h-10 px-4 py-2 rounded transition-colors ${
            section === 'interface' ? 'bg-neutral-100' : 'hover:bg-neutral-50'
          }`}
          onClick={() => setSection('interface')}
          role="button"
        >
          Налаштування інтерфейсу
        </li>
      </ul>
    </div>
  )
}

export default Menu
