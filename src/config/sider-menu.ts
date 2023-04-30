import { HomeOutlined, UserOutlined, SettingOutlined, KeyOutlined } from '@ant-design/icons'
import { AuthCode } from './constants'

export const enum MenuPageCode {
  HOME,
  USER,
  USER_LIST,
  USER_DETAIL,
  ACCESS,
  AUTH_LIST,
  ROLE_LIST,
}

const siderMenu: TSiderMenuItem[] = [
  {
    id: MenuPageCode.HOME,
    name: '主页',
    abbr: 'Home',
    icon: HomeOutlined,
    auth: [AuthCode.LOGIN_ADMIN],
    path: '/',
  },
  {
    id: MenuPageCode.USER,
    name: '用户',
    abbr: 'User',
    icon: UserOutlined,
    children: [
      {
        id: MenuPageCode.USER_LIST,
        name: '用户列表',
        breadcrumb: [{ text: '用户列表' }],
        abbr: 'List',
        icon: UserOutlined,
        auth: [AuthCode.LOGIN_ADMIN],
        path: '/user/list',
      },
    ],
  },
  {
    id: MenuPageCode.ACCESS,
    name: '权限',
    abbr: 'access',
    icon: KeyOutlined,
    children: [
      {
        id: MenuPageCode.AUTH_LIST,
        name: '权限列表',
        breadcrumb: [{ text: '权限列表' }],
        abbr: 'List',
        auth: [AuthCode.LOGIN_ADMIN],
        path: '/access/auth',
      },
      {
        id: MenuPageCode.ROLE_LIST,
        name: '角色列表',
        breadcrumb: [{ text: '角色列表' }],
        abbr: 'Role',
        auth: [AuthCode.LOGIN_ADMIN],
        path: '/access/role',
      },
    ],
  },
]

/**
 * 根据 page code 返回 menu 配置信息
 * @param code
 * @returns {TSiderMenuItem}
 */
export const findMenu = (code: MenuPageCode, list: TSiderMenuItem[] = siderMenu): TSiderMenuItem | null => {
  if (!list || list.length === 0) return null
  for (const menu of list) {
    if (menu.id === code) return menu
    const res = findMenu(code, menu.children || [])
    if (res) return res
  }
  return null
}

export default siderMenu
