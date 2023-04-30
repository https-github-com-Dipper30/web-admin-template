import { configApi } from '@/api'
import Loading from '@/components/common/Loading'
import { setUser } from '@/store/actions/user'
import { isSignedIn, handleResult } from '@/utils'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type BeforeEnterProps = {
  children: JSX.Element,
  options?: {
    requireLogin?: boolean,
    requireRole?: number[],
  },
}

const BeforeEnter: React.FC<BeforeEnterProps> = (props) => {

  const user = useSelector((state: any) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const autoLogin = async () => {
    const res = await configApi.loginByToken()
    if (!handleResult(res)) relogin()
    else {
      const { id, username, role, auth } = res.data.user
      const newUser = { id, username, role, auth }
      dispatch(setUser(newUser))
      localStorage.setItem('token', res.data.token)
    }
  }

  useEffect(() => {
    if (props?.options?.requireLogin !== false && !isSignedIn()) {
      // 检查本地token
      if (localStorage.getItem('token')) {
        autoLogin()
      } else {
        relogin()
      }
    }
  }, [])

  const relogin = () => {
    navigate('/passport')
  }

  return user && user.id > 0 ? props.children : <Loading />
}

export default BeforeEnter