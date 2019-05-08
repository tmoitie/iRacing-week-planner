import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function NextRace({ race }) {
  if (race.nextTime === null) {
    return <td>No time data</td>;
  }

  return (
    <td>
      <div>
        {moment(race.nextTime).local().format('ddd h:mma')}
      </div>
    </td>
  );
}

NextRace.propTypes = {
  race: PropTypes.object.isRequired
};
