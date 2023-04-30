import { HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './ABreadCrumb.scss'

type ABreadCrumbProps = {
  config: ABreadCrumbConfig[],
}

const ABreadCrumb: React.FC<ABreadCrumbProps> = (props) => {

  const navigate = useNavigate()

  const navigateTo = (route: string) => {
    navigate(route)
  }

  return (
    <div className='a-breadcrumb-container'>
      <div className='nav-item'>
        <div className='text clickable' onClick={() => navigateTo('/')}>
          <HomeOutlined />
        </div>
        {
          props.config.length > 0 ? (
            <div className='sperator'>
              /
            </div>
          ) : (<></>)
        }
      </div>
      { props.config.map((b, index) => {
        return (
          <div className='nav-item' key={index}>
            {
              b.route ? (
                <div className='text clickable' onClick={() => navigateTo(b.route as string)}>
                  { b.text }
                </div>
              ) : (
                <div className='text'>
                  { b.text }
                </div>
              )
            }
            {
              index == props.config.length - 1 ? (<></>) : (
                <div className='separator'>
                  /
                </div>
              )
            }
          </div>
        )})
      }
    </div>
  )
}

export default ABreadCrumb