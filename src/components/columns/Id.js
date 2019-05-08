import React from 'react';
import PropTypes from 'prop-types';

export default function Id({ race: { seriesId } }) {
  return (
    <td>
      <div>
        {seriesId}
      </div>
    </td>
  );
}

Id.propTypes = {
  race: PropTypes.object.isRequired
};
