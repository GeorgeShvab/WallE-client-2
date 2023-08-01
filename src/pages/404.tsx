import useTitle from '@/hooks/useTitle'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const PageNotFound: FC = () => {
  useTitle('Сторінку не знайдено')

  return (
    <div className="h-screen flex justify-center items-center px-6 flex-col gap-6">
      <div className="text-black-main" aria-hidden="true">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          className="h-20 w-20"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M3 7v4a1 1 0 001 1h3M7 7v10M10 8v8a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1h-2a1 1 0 00-1 1zM17 7v4a1 1 0 001 1h3M21 7v10" />
        </svg>
      </div>

      <h1 className="text-neutral-500">Сторінку не знайдено</h1>
      <p className="text-center text-sm text-sky-500 hover:text-sky-600 transition-colors">
        <Link to="/">На головну</Link>
      </p>
    </div>
  )
}

export default PageNotFound
