import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export default function NextRace({ race }) {
  const { t } = useTranslation();

  if (race.nextTime === null) {
    return <td>{t('No time data')}</td>;
  }

  const date = moment(race.nextTime).local().toDate();

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
