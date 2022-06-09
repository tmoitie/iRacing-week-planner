// @flow

import * as React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

type Props = {
  race: {
    seriesEnd: moment.Moment,
  }
};

export default function SeasonEnd({ race }: Props) {
  const { t } = useTranslation();
  const date = moment(race.seriesEnd).local().toDate();
  return (
    <td>
      <div>
        {t('{{date, datetime}}', { date })}
      </div>
    </td>
  );
}
