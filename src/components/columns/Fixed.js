import React from 'react';
import PropTypes from 'prop-types';

export default function Fixed({ race }) {
  return (
    <td>
      <div>
        {race.fixed && <span className='glyphicon glyphicon-ok' />}
      </div>
    </td>
  );
}

Fixed.propTypes = {
  race: PropTypes.object.isRequired
};
