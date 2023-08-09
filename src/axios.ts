import { Mutex } from 'async-mutex'
import axiosPackage, { InternalAxiosRequestConfig } from 'axios'

const axios = axiosPackage.create({
  baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
})

const mutex = new Mutex()

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    await mutex.waitForUnlock()

    if (!config.headers) {
      return config
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config
  },
  (error) => {
    console.log(error)
  }
)

axios.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const originalRequest = error.config

    if (error.response?.status === 418 && !originalRequest._retry) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()

        originalRequest._retry = true

        try {
          const { data } = await axiosPackage.post<{ access_token: string; refresh_token: string }>(
            `${import.meta.env.VITE_APP_SERVER_ADDRESS}/api/auth/refresh`,
            {},
            { headers: { refresh_token: window.localStorage.getItem('refresh_token') } }
          )

          window.localStorage.setItem('access_token', data.access_token)
          window.localStorage.setItem('refresh_token', data.refresh_token)

          originalRequest.headers.Authorization = `Bearer ${data.access_token}`

          return axios(originalRequest)
        } catch (e: any) {
          if (e?.response?.status === 401) {
            window.localStorage.clear()
            window.location = '/signin' as any
            return
          }

          return Promise.reject(e)
        } finally {
          release()
        }
      } else {
        await mutex.waitForUnlock()

        return axios(originalRequest)
      }
    } else if (!originalRequest._retry) {
      originalRequest._retry = true

      return axios(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default axios
