import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { getNextRace } from '../../lib/races';

export default function NextRace({ race }) {
  const { t } = useTranslation();

  const now = moment().utc();

  // Only update at most every minute
  const nowMemoizer = now.format('YYYY-MM-DD HH-mm');

  const nextTime = useMemo(() => getNextRace(now, race), [race, nowMemoizer]);

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

NextRace.propTypes = {
  race: PropTypes.object.isRequired
};
