import * as React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import type { TimeableRace } from '../../lib/races';
import { getNextRace } from '../../lib/races';

type Props = {
  race: TimeableRace,
};

export default function NextRace({ race }: Props) {
  const { t } = useTranslation();

  const now = moment().utc();

  // Only update at most every minute
  const nowMemoizer = now.format('YYYY-MM-DD HH-mm');

  const nextTime = React.useMemo(() => getNextRace(now, race), [race, nowMemoizer]);

  if (nextTime === null) {
    return <td>{t('No time data')}</td>;
  }

  const date = moment(nextTime).local().toDate();

  return (
    <td>
      <div>
        {t('{{date, ddd k:mm}}', { date })}
      </div>
    </td>
  );
}
