import { UserAction } from '@/types/store-action'

const initialState: LoginUserData | null = null

const userReducer = (preState: LoginUserData | null = initialState, action: any): LoginUserData | null => {
  const { type, data } = action
  switch (type) {
    case UserAction.SET_USER:
      return { ...data }
    case UserAction.SET_AVATAR:
      return preState
    default:
      return preState
  }
}

export default userReducer
