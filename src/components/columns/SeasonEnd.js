import React, { PropTypes } from 'react';
import moment from 'moment';

export default function SeasonEnd({ race }) {
  return (
    <td>
      <div>
        {moment(race.seriesEnd).local().format('YYYY-MM-DD')}
      </div>
    </td>
  );
}

SeasonEnd.propTypes = {
  race: PropTypes.object.isRequired
};
