// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  race: {
    raceLength?: {
      laps: string,
      minutes: string,
    },
  },
};

export default function RaceLength({ race }: Props) {
  // console.log(race);
  const { raceLength } = race;
  const { t } = useTranslation();

  const noData = <td><div>{t('No data')}</div></td>;

  if (!raceLength) {
    return noData;
  }

  if (raceLength.laps) {
    return (
      <td><div>{t('{{laps}}L', { laps: raceLength.laps })}</div></td>
    );
  }

  if (raceLength.minutes) {
    if (raceLength.minutes > 0 && raceLength.minutes % 60 === 0) {
      return (
        <td><div>{t('{{hours}}h', { hours: raceLength.minutes / 60 })}</div></td>
      );
    }
    return (
      <td><div>{t('{{minutes}}m', { minutes: raceLength.minutes })}</div></td>
    );
  }

  return noData;
}
