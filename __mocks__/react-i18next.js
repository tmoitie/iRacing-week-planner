import moment from 'moment';
import i18n from 'i18next';

i18n
  .init({
    resources: {},
    debug: false,
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
      format: (value, format) => {
        if (value instanceof Date) {
          return moment(value).format(format);
        }

        return value;
      },
    },
  });

export function useTranslation() {
  return {
    t: i18n.t.bind(i18n),
  };
}
export function withTranslation() {
  return (Component) => {
    // eslint-disable-next-line no-param-reassign
    Component.defaultProps = { ...Component.defaultProps, t: i18n.t.bind(i18n) };
    return Component;
  };
}
