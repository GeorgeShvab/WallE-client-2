import { signup } from '@/api/user'
import LoadingButton from '@/components/UIKit/LoadingButton'
import useMutation from '@/hooks/useMutation'
import { Formik, FormikHelpers } from 'formik'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

interface UserData {
  name: string
  userName: string
  email: string
  password: string
}

interface Props {
  setSection: (param: 'choice' | 'first_step' | 'second_step' | 'finish') => void
  user: UserData
  setUser: (param: Partial<UserData>) => void
}

interface Values {
  email: string
  password: string
}

const validationSchema = yup.object<Values>({
  email: yup.string().required('Вкажіть ваш емейл').email('Вкажіть коректний емейл'),
  password: yup
    .string()
    .required('Вкажіть надійний пароль')
    .min(6, 'Пароль повинен містити принанні 6 символів')
    .max(100, 'Пароль повинен містити не більше 100 символів'),
})

const SecondStep: FC<Props> = ({ setSection, user, setUser }) => {
  const { mutateAsync, isLoading, isError } = useMutation(signup)

  const handleSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await mutateAsync({ ...user, ...values })

      setUser(values)

      setSection('finish')
    } catch (e: any) {
      if (e.response?.status === 400) {
        helpers.setErrors(e.response.data)
      }
    }
  }

  return (
    <div className="px-8 py-12 lg:px-16 sm:rounded shadow bg-white relative h-[520px] w-[450px] flex justify-center">
      <button
        className="absolute left-4 top-4 text-black-main hover:bg-neutral-50 p-2 rounded-full"
        onClick={() => setSection('first_step')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
      <div>
        <div className="flex justify-center mb-6">
          <svg
            aria-hidden="true"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3.84003" y="2.88" width="40.32" height="40.32" rx="8" fill="white" />
            <path
              d="M14.0469 29.7969L18.2031 33.9531L16.7812 35.375H15.25V32.75H12.625V31.2188L14.0469 29.7969ZM25.3672 19.1328C25.6224 19.3698 25.5951 19.6432 25.2852 19.9531L17.3281 27.9102C17.0182 28.2201 16.7448 28.2474 16.5078 27.9922C16.2526 27.7552 16.2799 27.4818 16.5898 27.1719L24.5469 19.2148C24.8568 18.9049 25.1302 18.8776 25.3672 19.1328ZM17.875 38L32.75 23.125L24.875 15.25L10 30.125V38H17.875ZM34.5 21.375L37.0156 18.8594C37.526 18.349 37.7812 17.7292 37.7812 17C37.7812 16.2708 37.526 15.651 37.0156 15.1406L32.8594 10.9844C32.349 10.474 31.7292 10.2188 31 10.2188C30.2708 10.2188 29.651 10.474 29.1406 10.9844L26.625 13.5L34.5 21.375ZM45 10.875V37.125C45 39.2943 44.2298 41.1491 42.6895 42.6895C41.1491 44.2298 39.2943 45 37.125 45H10.875C8.70573 45 6.85091 44.2298 5.31055 42.6895C3.77018 41.1491 3 39.2943 3 37.125V10.875C3 8.70573 3.77018 6.85091 5.31055 5.31055C6.85091 3.77018 8.70573 3 10.875 3H37.125C39.2943 3 41.1491 3.77018 42.6895 5.31055C44.2298 6.85091 45 8.70573 45 10.875Z"
              fill="#121212"
            />
          </svg>
        </div>
        <h1 className="text-2xl text-center font-bold mb-6">Створити аккаунт</h1>
        <p className="text-center text-neutral-400 text-sm mb-12">Вкажіть ваш емейл та надійний пароль</p>
        <div className="flex flex-col items-center gap-2.5 mb-6">
          <Formik
            initialValues={{ email: user.email, password: user.password }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={!isError}
            enableReinitialize
          >
            {({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <fieldset className="mb-3">
                  <input
                    name="email"
                    type="text"
                    autoComplete="email"
                    placeholder="Email"
                    className={`w-72 h-10 border-2 border-black-main rounded outline-none px-3 py-1.5 transition-all mb-2 block ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:shadow-input-error'
                        : 'focus:border-theme focus:shadow-input-theme'
                    }`}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Пароль"
                    className={`w-72 h-10 border-2 border-black-main rounded outline-none px-3 py-1.5 transition-all block ${
                      touched.password && errors.password
                        ? 'border-red-500 focus:shadow-input-error'
                        : 'focus:border-theme focus:shadow-input-theme'
                    }`}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </fieldset>
                <p className="mb-3 text-xs text-red-500 max-w-[288px]">
                  {(touched.email && errors.email) || (touched.password && errors.password) || <>&nbsp;</>}
                </p>

                <LoadingButton
                  isLoading={isLoading}
                  type="submit"
                  disabled={Boolean(
                    (touched.email && errors.email) ||
                      (touched.password && errors.password) ||
                      !values.email ||
                      !values.password ||
                      isLoading
                  )}
                  className="w-72"
                >
                  Створити аккаунт
                </LoadingButton>
              </form>
            )}
          </Formik>
        </div>
        <p className="text-center text-sm text-neutral-400 transition-colors">
          Вже маєте аккаунт?{' '}
          <Link to="/signin" className="text-sky-500 hover:text-sky-600">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SecondStep
