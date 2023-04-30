import SiderHead from './SiderHead'
import siderMenu from '@/config/sider-menu'
import SiderMenuItem from './SiderMenuItem'
import { Switch } from 'antd'
import useTheme from '@/hooks/useTheme'
import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '@/hooks/redux'

type SiderProps = {
  collapsed: boolean,
}

const Sider: React.FC<SiderProps> = (props) => {

  const [theme, changeTheme] = useTheme()
  const [rawMenu, setRawMenu] = useState<TSiderMenuItem[]>([])
  const auth: number[] = useAppSelector(state => state.user?.auth || [])

  useEffect(() => {
    import('@/config/sider-menu').then((res: any) => setRawMenu(res))
  }, [])

  const shakeMenu = (menu: any[]) => {
    const n = []
    for (const item of menu) {
      // 判断是否有权限
      let hasAccess = true
      if (item.auth) {
        for (const authToCheck of item.auth) {
          if (!auth.includes(authToCheck)) {
            hasAccess = false
            break
          }
        }
      }
      if (hasAccess) {
        const menuItem: any = {
          id: item.id,
          name: item.name,
          icon: item.icon,
          auth: item.auth,
          path: item.path,
          abbr: item.abbr,
        }
        if (item.children) {
          menuItem.children = shakeMenu(item.children)
        }
        n.push(menuItem)
      }
    }
    return n
  }

  const menu = useMemo(() => shakeMenu(siderMenu), [rawMenu])

  const handleChangeTheme = (checked: boolean) => {
    changeTheme(checked ? 'dark' : 'light')
  }

  return (
    <div className={ `sider-container${ props.collapsed ? ' collapsed' : '' }` }>
      <SiderHead collapsed={props.collapsed} />

      <div className='menu-list'>
        {
          menu && menu.map((item, index: number) => (
            <SiderMenuItem key={index} menuItem={item} />
          ))
        }
      </div>

      <div className='sider-footer'>
        <div className='theme-selector'>
          <Switch
            className={`${theme === 'dark' ? 'dark' : 'light'}`}
            checkedChildren={'黑夜'}
            unCheckedChildren={'白天'}
            defaultChecked={theme == 'dark'}
            onChange={handleChangeTheme}
          />
        </div>
      </div>
      {/* <div onClick={() => navigate('')}> Home </div>
      <div> User Items </div>
      <div onClick={() => navigate('user')}> User </div>
      <div onClick={() => navigate('user/list')}> Userlist </div> */}
    </div>
  )
}

export default Sider