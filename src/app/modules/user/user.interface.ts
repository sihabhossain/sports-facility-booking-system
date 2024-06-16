import { USER_Role } from './user.constant'

export type TUser = {
  name: string
  email: string
  password: string
  phone: string
  role: keyof typeof USER_Role
  address: string
}


