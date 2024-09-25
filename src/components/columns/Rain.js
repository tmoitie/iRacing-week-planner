// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  race: {
    precipChance: number,
  },
};

export default function Rain({ race }: Props) {
  const { t } = useTranslation();
  let rainText = t('No');
  if (race.precipChance === 100) {
    rainText = t('Yes');
  }
  if (race.precipChance > 0) {
    rainText = t('Chance');
  }
  return (
    <td>
      <div>
        {rainText}
      </div>
    </td>
  );
}
