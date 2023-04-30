import { UserAction } from '@/types/store-action'

const initialState: TUser | null = null

const userReducer = (preState: TUser | null = initialState, action: any): TUser | null => {
  const { type, data } = action
  switch (type) {
  case UserAction.SET_USER:
    return { ...data }
  case UserAction.SET_AVATAR:
    return preState ?? null
  default:
    return preState
  }
}

export default userReducer