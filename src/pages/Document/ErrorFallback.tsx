import { FC } from 'react'
import { Link } from 'react-router-dom'

const getErrorMessage = (code: number) => {
  switch (code) {
    case 403:
      return 'У вас немає доступу до цього документа'
    case 401:
      return 'Ви не авторизовані'
    default:
      return "Помилка з'єднання"
  }
}

const ErrorFallback: FC<{ error: any }> = ({ error }) => {
  const message = getErrorMessage(error.statusCode)

  return (
    <div className="h-screen flex justify-center items-center px-6 flex-col gap-6">
      <div className="text-red-600" aria-hidden="true">
        {error.statusCode === 403 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        )}
      </div>

      <h1 className="text-neutral-500">{message}</h1>
      <p className="text-center text-sm text-sky-500 hover:text-sky-600 transition-colors">
        <Link to="/">На головну</Link>
      </p>
    </div>
  )
}

export default ErrorFallback
