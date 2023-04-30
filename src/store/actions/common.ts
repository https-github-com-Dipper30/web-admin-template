import { CommonAction } from '@/types/store-action'

export const selectMenu = (id: number) => ({ type: CommonAction.SELECT_MENU, data: id })

export const toggleMenu = (data: boolean) => ({ type: CommonAction.TOGGLE_MENU, data })

export const changeTheme = (data: Theme) => ({ type: CommonAction.CHANGE_THEME, data })