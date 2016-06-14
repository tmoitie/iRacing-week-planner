import React, { PropTypes } from 'react';

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
