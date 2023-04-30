import { HomeOutlined, UserOutlined, SettingOutlined, KeyOutlined } from '@ant-design/icons'

const siderMenu: TSiderMenuItem[] = [
  {
    id: 1,
    name: '主页',
    abbr: 'Home',
    icon: HomeOutlined,
    auth: [1],
    path: '/',
  },
  {
    id: 2,
    name: '用户',
    abbr: 'User',
    icon: UserOutlined,
    children: [
      {
        id: 4,
        name: '用户列表',
        abbr: 'List',
        icon: UserOutlined,
        auth: [1],
        path: '/user/list',
      },
    ],
  },
  {
    id: 8,
    name: '权限',
    abbr: 'access',
    icon: KeyOutlined,
    children: [
      {
        id: 9,
        name: '权限列表',
        abbr: 'List',
        auth: [1],
        path: '/access/auth',
      },
      {
        id: 10,
        name: '角色列表',
        abbr: 'Role',
        auth: [1],
        path: '/access/role',
      },
    ],
  },
  {
    id: 20,
    name: '设置',
    abbr: 'setting',
    icon: SettingOutlined,
    children: [
      {
        id: 21,
        name: '文件设置',
        abbr: 'file',
        auth: [1],
        path: '/setting/file',
      },
    ],
  },
]

export default siderMenu