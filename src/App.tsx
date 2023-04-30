import '@/i18n/config'
import AppRouter from '@/routes'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { changeLanguage } from './store/actions/common'
import { getLocalLanguage } from './utils/tools'
import { LANGUAGE } from './config/constants'

const App: React.FC = props => {
  const dispatch = useAppDispatch()
  dispatch(changeLanguage(getLocalLanguage() as LANGUAGE))
  return <AppRouter />
}

export default App
