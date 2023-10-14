import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import pt from '../assets/languages/pt.json';
import en from '../assets/languages/en.json';

const languageResources = {
  en: {translation: en},
  pt: {translation: pt},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;
