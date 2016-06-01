import React, { PropTypes } from 'react';

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
