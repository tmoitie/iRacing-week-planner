import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';

import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/en';
import '@formatjs/intl-datetimeformat/locale-data/en-GB';
import '@formatjs/intl-datetimeformat/locale-data/es';
import '@formatjs/intl-datetimeformat/locale-data/pt';
import '@formatjs/intl-datetimeformat/locale-data/de';
import '@formatjs/intl-datetimeformat/locale-data/fr';
import '@formatjs/intl-datetimeformat/locale-data/it';
import '@formatjs/intl-datetimeformat/locale-data/tr';
import '@formatjs/intl-datetimeformat/locale-data/ja';
import '@formatjs/intl-datetimeformat/locale-data/nl';
import '@formatjs/intl-datetimeformat/locale-data/pl';
import '@formatjs/intl-datetimeformat/locale-data/cs';
import '@formatjs/intl-datetimeformat/locale-data/ru';
import '@formatjs/intl-datetimeformat/locale-data/zh';
import '@formatjs/intl-datetimeformat/add-all-tz';

import en from '../translations/en';
import enGB from '../translations/en-GB';
import es from '../translations/es';
import ptBR from '../translations/pt-BR';
import de from '../translations/de';
import fr from '../translations/fr';
import it from '../translations/it';
import tr from '../translations/tr';
import ja from '../translations/jp';
import nl from '../translations/nl';
import pl from '../translations/pl';
import csCZ from '../translations/cs-CZ';
import ru from '../translations/ru';
import zhCN from '../translations/zh-CN';

const languages = {
  'cs-CZ': {
    name: 'Čeština',
  },
  de: {
    name: 'Deutsch',
  },
  'en-US': {
    name: 'English',
  },
  'en-GB': {
    name: 'English',
  },
  es: {
    name: 'Español',
  },
  fr: {
    name: 'Français',
  },
  it: {
    name: 'Italiano',
  },
  ja: {
    name: '日本語',
  },
  nl: {
    name: 'Nederlands',
  },
  pl: {
    name: 'Polski',
  },
  'pt-BR': {
    name: 'Português',
  },
  ru: {
    name: 'Русский',
  },
  tr: {
    name: 'Türkçe',
  },
  'zh-CN': {
    name: '简体中文',
  },
};

export default languages;

const resources = {
  'en-US': en,
  'en-GB': enGB,
  es,
  'pt-BR': ptBR,
  de,
  fr,
  it,
  ja,
  nl,
  tr,
  pl,
  'cs-CZ': csCZ,
  ru,
  'zh-CN': zhCN,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    debug: false,
    keySeparator: false,
    nsSeparator: false,
    supportedLngs: Object.keys(languages),
    detection: {
      convertDetectedLanguage: (language) => {
        if (['en-au', 'en-gb'].includes(language.toLowerCase())) {
          return 'en-GB';
        }

        return language.toLowerCase().startsWith('en') ? 'en-US' : language;
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

i18n.on('languageChanged', (lng) => {
  moment.locale(lng);
});

moment.locale(i18n.language);
