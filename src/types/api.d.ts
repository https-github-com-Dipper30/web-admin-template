/// <reference types="vite/client" />

type LoginData = {
  user: LoginUserData
  token: string
}

type LoginUserData = {
  id: number
  username: string
  avatar?: string
  role: RoleValue
  auth: number[]
}

type RoleValue = {
  id: number
  name: string
  description?: string
}

type AuthValue = {
  id: number
  name: string
  description?: string
}
