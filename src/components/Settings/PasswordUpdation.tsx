import { FC } from 'react'
import { Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import { updatePassword } from '@/api/user'
import LoadingButton from '../UIKit/LoadingButton'
import { useAppDispatch } from '@/redux/store'
import { show } from '@/redux/slices/alert'
import useMutation from '@/hooks/useMutation'

interface Values {
  oldPassword: string
  password: string
}

const validationSchema = yup.object<Values>({
  password: yup
    .string()
    .required('Вкажіть надійний пароль')
    .min(6, 'Пароль повинен містити принанні 6 символів')
    .max(100, 'Пароль повинен містити не більше 100 символів'),
  oldPassword: yup
    .string()
    .required('Вкажіть старий пароль')
    .min(6, 'Невірний старий пароль')
    .max(100, 'Невірний старий пароль'),
})

const PasswordUpdation: FC = () => {
  const dispatch = useAppDispatch()

  const { mutateAsync, isLoading, isError } = useMutation(updatePassword)

  const handleSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await mutateAsync(values)

      helpers.resetForm()

      dispatch(show({ message: 'Пароль успішно змінено', severity: 'success' }))
    } catch (e: any) {
      if (e.response?.status === 401) {
        helpers.setErrors({ oldPassword: 'Невірний старий пароль' })
      } else if (e.response?.status === 400) {
        helpers.setErrors(e.response.data)
      }
    }
  }

  return (
    <div className="">
      <h3 className="text-black-main text-sm mb-6 font-medium">Зміна пароля</h3>
      <div className="flex flex-col items-center gap-2.5 mb-6">
        <Formik
          initialValues={{ password: '', oldPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={!isError}
          enableReinitialize
        >
          {({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <fieldset className="mb-3">
                <input
                  name="oldPassword"
                  type="password"
                  autoComplete="password"
                  placeholder="Старий пароль"
                  className={`w-72 h-10 border-2 border-black-main rounded outline-none px-3 py-1.5 transition-all mb-2 block ${
                    touched.oldPassword && errors.oldPassword
                      ? 'border-red-500 focus:shadow-input-error'
                      : 'focus:border-theme focus:shadow-input-theme'
                  }`}
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Новий пароль"
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
              {((touched.oldPassword && errors.oldPassword) || (touched.password && errors.password)) && (
                <p className="mb-3 text-xs text-red-500 max-w-[288px]">
                  {(touched.oldPassword && errors.oldPassword) || (touched.password && errors.password)}
                </p>
              )}

              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="w-full"
                disabled={Boolean(
                  (touched.oldPassword && errors.oldPassword) ||
                    (touched.password && errors.password) ||
                    !values.password ||
                    !values.oldPassword ||
                    isLoading
                )}
                color="theme"
              >
                Змінити
              </LoadingButton>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default PasswordUpdation
