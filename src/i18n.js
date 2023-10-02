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

const languages = {
  de: {
    flag: '🇩🇪',
    name: 'Deutsch (DE)',
  },
  en: {
    flag: '🇺🇸',
    name: 'English (US)',
  },
  'en-GB': {
    flag: '🇬🇧',
    name: 'English (UK)',
  },
  es: {
    flag: '🇪🇸',
    name: 'Español (ES)',
  },
  fr: {
    flag: '🇫🇷',
    name: 'Français (FR)',
  },
  it: {
    flag: '🇮🇹',
    name: 'Italiano (IT)',
  },
  ja: {
    flag: '🇯🇵',
    name: '日本語 (JA)',
  },
  nl: {
    flag: '🇳🇱',
    name: 'Nederlands (NL)',
  },
  pl: {
    flag: '🇵🇱',
    name: 'Polski (PL)',
  },
  'pt-BR': {
    flag: '🇧🇷',
    name: 'Português (BR)',
  },
  tr: {
    flag: '🇹🇷',
    name: 'Türkçe (TR)',
  },
};

export default languages;

const resources = {
  en,
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
};

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  languages.test = { flag: '👀', name: 'Test' };
  // eslint-disable-next-line global-require
  resources.test = require('../translations/fake').default;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    keySeparator: false,
    nsSeparator: false,
    supportedLngs: Object.keys(languages),
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
