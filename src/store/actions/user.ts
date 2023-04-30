import { UserAction } from '@/types/store-action'

export const setUser = (data: LoginUserData) => ({ type: UserAction.SET_USER, data })

export const setAvatar = (id: string) => ({ type: UserAction.SET_AVATAR, data: id })
