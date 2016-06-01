import React, { PropTypes } from 'react';

export default function Official({ race }) {
  return (
    <td>
      <div>
        {race.official && <span className='glyphicon glyphicon-ok' />}
      </div>
    </td>
  );
}

Official.propTypes = {
  race: PropTypes.object.isRequired
};
