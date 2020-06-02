import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export default function EndDate({ race }) {
  const { t } = useTranslation();
  const date = moment(race.startTime).local().add(race.weekLength).subtract(1, 'days').toDate();
  return (
    <td>
      <div>
        {t('{{date, YYYY-MM-DD}}', { date })}
      </div>
    </td>
  );
}

EndDate.propTypes = {
  race: PropTypes.object.isRequired
};
