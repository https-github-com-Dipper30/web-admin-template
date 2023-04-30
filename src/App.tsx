import logo from '@/assets/images/logo.svg'
import './App.scss'
import { connect } from 'react-redux'
import { setUser } from './store/actions/user'
import useTheme from '@/hooks/useTheme'

function App (props: any) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Theme, changeTheme] = useTheme()

  const changeTheme = () => {
    // changeTheme()
  }

  return (
    <div className='App'>
      <header className='App-header color-mode-transition'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Hello Vite + React + Typescript!</p>
        <p>
          <button type='button' onClick={changeTheme}>
            Change Theme
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          User: { props.user?.id }
        </p>
        <div id='list'>
        </div>
      </header>
    </div>
  )
}

export default connect(
  (state: any) => ({
    user: state.user,
  }),
  {
    setUser,
  },
)(App)
