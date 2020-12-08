// @flow

import * as React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

type Props = {
  race: {
    startTime: moment.Moment,
    weekLength: moment.Duration,
  }
};

export default function EndDate({ race }: Props) {
  const { t } = useTranslation();
  const date = moment(race.startTime)
    .local()
    .add(race.weekLength)
    .subtract(1, 'days')
    .toDate();

  return (
    <td>
      <div>
        {t('{{date, YYYY-MM-DD}}', { date })}
      </div>
    </td>
  );
}
