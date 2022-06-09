// @flow
import * as React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

type Props = {
  race: {
    startTime: moment.Moment,
  }
};
export default function StartDate({ race }: Props) {
  const { t } = useTranslation();
  const date = moment(race.startTime).local().toDate();
  return (
    <td>
      <div>
        {t('{{date, datetime}}', { date })}
      </div>
    </td>
  );
}
