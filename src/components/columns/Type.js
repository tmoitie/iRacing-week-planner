// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  race: {
    type: string,
  },
};

export default function Type({ race }: Props) {
  const { t } = useTranslation();
  return (
    <td><div>{t(race.type)}</div></td>
  );
}
