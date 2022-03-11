// @flow

import * as React from 'react';

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

export const useTranslation = jest.fn(() => (
  {
    t: i18n.t.bind(i18n),
    i18n,
  }
));

export const initReactI18next = { type: '3rdParty', init: () => {} };
export function Trans({ children }: { children: React.Node }) {
  return <>{children}</>;
}
