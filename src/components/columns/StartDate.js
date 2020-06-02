import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export default function StartDate({ race }) {
  const { t } = useTranslation();
  const date = moment(race.startTime).local().toDate();
  return (
    <td>
      <div>
        {t('{{date, YYYY-MM-DD}}', { date })}
      </div>
    </td>
  );
}

StartDate.propTypes = {
  race: PropTypes.object.isRequired
};
