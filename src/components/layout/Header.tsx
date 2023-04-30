import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  collapsed: boolean
}

const Header: React.FC<HeaderProps> = props => {
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.user)
  const { t } = useTranslation()
  const checkDetail = () => {
    navigate(`user/${user.id}`)
  }

  return (
    <div className={`header-container${props.collapsed ? ' collapsed' : ''}`}>
      <div className='title'> {t('title')}</div>
      <div>
        <div className='user' onClick={checkDetail}>
          {user?.username}
        </div>
      </div>
    </div>
  )
}

export default Header
