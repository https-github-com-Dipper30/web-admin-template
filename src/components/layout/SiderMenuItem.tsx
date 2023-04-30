import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SiderMenuItem.scss'
import { RightOutlined, DownOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { selectMenu } from '@/store/actions/common'
import { findMenu } from '@/config/sider-menu'

type SiderMenuItemProps = {
  menuItem: TSiderMenuItem
}

const SiderMenuItem: React.FC<SiderMenuItemProps> = props => {
  const dispatch = useAppDispatch()
  const selected = useAppSelector(state => state.common.selectedMenu)
  const layoutCollapsed = useAppSelector(state => state.common.menuCollapsed)
  const [collapsed, setCollapsed] = useState(true)
  const subMenuRef = useRef<any>()
  const navigate = useNavigate()
  const Icon = props.menuItem.icon

  /* 有子菜单则做下拉/收回操作，否则进行页面跳转 */
  const onMenuItem = () => {
    if (props.menuItem.children?.length) {
      setCollapsed(!collapsed)
    } else {
      directTo(props.menuItem.id, props.menuItem.path as string)
    }
  }

  const directTo = (id: number, path: string) => {
    dispatch(selectMenu(id))
    navigate(path)
  }

  useEffect(() => {
    const isChildSelected = findMenu(selected, props.menuItem.children)
    if (isChildSelected) setCollapsed(false)
  }, [selected])

  useEffect(() => {
    setTimeout(() => {
      subMenuRef.current.style.height = collapsed ? '45px' : `${45 + (props.menuItem.children?.length || 0) * 40}px`
    }, 0)
  }, [collapsed, props.menuItem])

  const listIcon = props.menuItem.children && !layoutCollapsed && (
    <div className="list-icon">{collapsed ? <RightOutlined /> : <DownOutlined />}</div>
  )

  return (
    <div className="sider-menu-item-container" ref={subMenuRef}>
      <div
        className={`item-container${props.menuItem.children ? '' : ' hoverable'}${
          selected === props.menuItem.id ? ' selected' : ''
        }`}
        onClick={onMenuItem}
      >
        <div className="icon">
          <Icon />
        </div>
        <div className="item-name">{!layoutCollapsed && props.menuItem.name}</div>
        {listIcon}
      </div>

      {props.menuItem.children && (
        <div className="sub-menu-container">
          {props.menuItem.children?.map((c, index) => (
            <div
              key={index}
              className={`sub-menu-item-container hoverable${selected === c.id ? ' selected' : ''} `}
              onClick={() => directTo(c.id, c.path as string)}
            >
              {c.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SiderMenuItem
