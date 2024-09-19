import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import commonKr from './kr.json';

i18n.use(initReactI18next).init({
  lng: 'kr',
  fallbackLng: 'kr',
  resources: {
    kr: {translation: commonKr},
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
