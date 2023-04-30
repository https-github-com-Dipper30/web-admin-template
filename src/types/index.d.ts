/// <reference types="vite/client" />

type TThemeProperty = {
  // 背景色
  surface1: string
  surface2: string
  surface3: string
  surface_hover: string
  surface_hover_dark: string
  surface_hover_light: string

  // 文字
  text1: string
  text2: string
  text3: string

  // 元素主色
  prime1: string
  prime2: string
  prime3: string
  prime_hover: string

  // 元素辅色
  second1: string
  second2: string
  second3: string
  second_hover: string

  // 边框
  border_dark: string
  border_light: string

  // 固定色
  green: string
  green_hover: string
  pink: string
  red: string
  blue: string
  grey: string

  sider1?: string
  sider2?: string
  sider3?: string

  [key: string]: string
}

type TThemeType = {
  light: TThemeProperty
  dark: TThemeProperty
}

type TUser = {
  id: number
  username: string
  auth: []
  avatar?: string
  role: {
    id: number
    name: string
  }
}

type TUserProfile = {
  id: number
  username: string
  avatar?: string
}

type TCommon = {
  selectedMenu: number
  menuCollapsed: boolean
  theme: Theme
  language: LANGUAGE
}

type TStoreAction<T, D> = {
  type: T
  data: D
}

type TSiderMenuItem = {
  id: number
  name: string
  abbr: string
  auth?: number[]
  breadcrumb?: ABreadCrumbConfig[]
  icon?: any
  path?: string
  children?: TSiderMenuItem[]
}

type TPager = {
  page: number
  size: number
}

type TUserRowInfo = {
  id: number
  username: string
  destroyed: boolean
  role: {
    id: number
    name: string
    description: string
  }
  auth: {
    id: number
    name: string
    description: string
  }[]
}

type TRoleRowInfo = {
  id: number
  name: string
  description: string
  auth: TAuthRowInfo[]
}

type TAuthRowInfo = {
  id: number
  name: string
  description: string
}
