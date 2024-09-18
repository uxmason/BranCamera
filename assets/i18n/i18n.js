import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import commonKr from './kr.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'kr',
  fallbackLng: 'en',
  debug: true,
  resources: {
    kr: {common: commonKr},
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
