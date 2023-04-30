import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import zhCN from './zhCN'
import zhTW from './zhTW'
import { getLocalLanguage } from '@/utils/tools'

export const resources = {
  en: {
    translation: en,
  },
  zhCN: {
    translation: zhCN,
  },
  zhTW: {
    translation: zhTW,
  },
}

const language = getLocalLanguage()

i18next.use(initReactI18next).init({
  lng: language,
  resources,
})

export default i18next
