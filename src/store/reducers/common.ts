import { CommonAction } from '@/types/store-action'

const initialState: TCommon = {
  selectedMenu: 1,
  menuCollapsed: false,
  theme: 'dark',
}

const commonReducer = (preState: TCommon = initialState, action: any): TCommon => {
  const { type, data } = action
  switch (type) {
    case CommonAction.SELECT_MENU:
      return { ...preState, selectedMenu: data }
    case CommonAction.TOGGLE_MENU:
      return { ...preState, menuCollapsed: data }
    case CommonAction.CHANGE_THEME:
      // 更换主题色
      localStorage.setItem('theme', data)
      return { ...preState, theme: data }
    default:
      return preState
  }
}

export default commonReducer
