import React, { PropTypes } from 'react';
import moment from 'moment';

export default function StartDate({ race }) {
  return (
    <td>
      <div>
        {moment(race.startTime).local().format('YYYY-MM-DD')}
      </div>
    </td>
  );
}

StartDate.propTypes = {
  race: PropTypes.object.isRequired
};
