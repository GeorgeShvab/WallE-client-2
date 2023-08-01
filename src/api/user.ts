import axios from '@/axios'
import { User } from '@/types'

export const signup = (body: { name: string; userName: string; email: string; password: string }) =>
  axios.post('/api/registration', body)

export const signin = (body: { email: string; password: string }) => axios.post('/api/login', body)

export const authorizeWithGoogle = (body: { access_token: string }) => axios.post('/api/auth/google', body)

export const checkUserName = (body: { userName: string }) => axios.post('/api/registration/check/username', body)

export const confirmEmail = (token: string) => axios.post('/api/registration/confirmation?token=' + token)

export const resetPasswordRequest = (body: { email: string }) => axios.post('/api/user/reset-password/request', body)

export const resetPassword = (body: { password: string; token: string }) => axios.post('/api/user/reset-password', body)

export const updateMe = async (body: Partial<User>) => await axios.patch('/api/user/update/data', body)

export const updatePassword = async (body: { password: string; oldPassword: string }) =>
  await axios.patch('/api/user/update/password', body)
