import { Button, Input } from 'antd'
import { useState } from 'react'
import { configApi } from '@/api'
import { handleResult } from '@/utils'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/actions/user'
import { useLocation, useNavigate } from 'react-router-dom'
import { getParams } from '@/utils/tools'
import './index.scss'

const Passport: React.FC<any> = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const login = async () => {
    const res: any = await configApi.login({ username, password })
    if (handleResult(res)) {
      const { user, token } = res.data
      localStorage.setItem('token', token)
      const search = location.search
      const p = getParams(search)
      dispatch(setUser(user))
      if (p.redirect) navigate(`/${p.redirect}`)
      else navigate('/')
    }
  }

  return (
    <div className='passport-page'>
      <div className='input-container'>
        <div className='title'>
          <div className='line'>
            APTX4869 Studio
          </div>
          <div className='line'>
            CRM Passport
          </div>
        </div>
        <div className='item'>
          <div className='label'>用户名</div>
          <Input value={username} onInput={(e: any) => setUsername(e.target.value)} placeholder='4~18个字符' />
        </div>
        <div className='item'>
          <div className='label'>密码</div>
          <Input
            type='password'
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
            placeholder='6~18个字符'
            onPressEnter={login}
          />
        </div>
        <div className='item align-right'>
          <Button onClick={login}> login </Button>
        </div>
      </div>
    </div>
  )
}

export default Passport