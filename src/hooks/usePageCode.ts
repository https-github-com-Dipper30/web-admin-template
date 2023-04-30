import { selectMenu } from '@/store/actions/common'
import { useAppDispatch, useAppSelector } from './redux'
import { MenuPageCode, findMenu } from '@/config/sider-menu'
import { useEffect, useMemo } from 'react'

/**
 * 对面包屑导航和边栏选中样式做处理
 * @param {MenuPageCode} code
 */
const usePageCode = (code: MenuPageCode) => {
  const dispatch = useAppDispatch()
  const menu = useMemo(() => findMenu(code), [code])

  useEffect(() => {
    if (!menu) return
    dispatch(selectMenu(menu.id))
  }, [menu])

  return menu?.breadcrumb || []
}

export default usePageCode
