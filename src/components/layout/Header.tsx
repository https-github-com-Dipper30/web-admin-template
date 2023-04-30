import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  collapsed: boolean
}

const Header: React.FC<HeaderProps> = props => {
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.user)

  const checkDeitail = () => {
    navigate(`user/${user.id}`)
  }

  return (
    <div className={`header-container${props.collapsed ? ' collapsed' : ''}`}>
      <div className="title">APTX4869 工作室 CRM 管理平台</div>
      <div>
        <div className="user" onClick={checkDeitail}>
          {user?.username}
        </div>
      </div>
    </div>
  )
}

export default Header
