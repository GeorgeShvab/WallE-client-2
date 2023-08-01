import { FC } from 'react'
import { Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import { User } from '@/types'
import { updateMe } from '@/api/user'
import LoadingButton from '../UIKit/LoadingButton'
import { useAppDispatch } from '@/redux/store'
import { updateUser } from '@/redux/slices/user'
import { show } from '@/redux/slices/alert'
import useMutation from '@/hooks/useMutation'

interface Values {
  name: string
  userName: string
}

const validationSchema = yup.object<Values>({
  name: yup
    .string()
    .required("Вкажіть ім'я")
    .min(2, "Ім'я повинно містити принанні 2 символи")
    .max(30, "Ім'я повинно містити не більше 30 символів"),
  userName: yup
    .string()
    .required('Вкажіть нікнейм')
    .matches(/^[A-Za-z0-9._-]+$/i, 'Допускаються лише цифри, букви латинського алфавіту, тире та прочерк')
    .min(2, 'Нікнейм повинен містити принанні 2 символи')
    .max(30, 'Нікнейм повинен містити не більше 30 символів'),
})

const NameUpdation: FC<User> = ({ name, userName }) => {
  const dispatch = useAppDispatch()

  const { mutateAsync, isLoading, isError } = useMutation(updateMe)

  const handleSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      const data: any = values

      if (data.userName === userName) delete data.userName

      await mutateAsync(data)

      dispatch(updateUser(values))

      dispatch(show({ message: 'Дані успішно змінені', severity: 'success' }))
    } catch (e: any) {
      if (e.response?.status === 400) {
        helpers.setErrors(e.response.data)
      }
    }
  }

  return (
    <div className="mb-10">
      <h3 className="text-black-main text-sm mb-6 font-medium">Зміна імені та нікнейма</h3>
      <div className="flex flex-col items-center gap-2.5 mb-6">
        <Formik
          initialValues={{ name: name, userName: userName }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={!isError}
          enableReinitialize
        >
          {({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <fieldset className="mb-3">
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ім'я"
                  className={`w-72 h-10 border-2 border-black-main rounded outline-none px-3 py-1.5 transition-all mb-2 block ${
                    touched.name && errors.name
                      ? 'border-red-500 focus:shadow-input-error'
                      : 'focus:border-theme focus:shadow-input-theme'
                  }`}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  name="userName"
                  type="text"
                  autoComplete="off"
                  placeholder="Нікнейм"
                  className={`w-72 h-10 border-2 border-black-main rounded outline-none px-3 py-1.5 transition-all block ${
                    touched.userName && errors.userName
                      ? 'border-red-500 focus:shadow-input-error'
                      : 'focus:border-theme focus:shadow-input-theme'
                  }`}
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </fieldset>
              {((touched.name && errors.name) || (touched.userName && errors.userName)) && (
                <p className="mb-3 text-xs text-red-500 max-w-[288px]">
                  {(touched.name && errors.name) || (touched.userName && errors.userName)}
                </p>
              )}

              <LoadingButton
                isLoading={isLoading}
                className="w-full"
                type="submit"
                disabled={Boolean(
                  (touched.name && errors.name) ||
                    (touched.userName && errors.userName) ||
                    !values.name ||
                    !values.userName ||
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

export default NameUpdation
