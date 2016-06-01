import React, { PropTypes } from 'react';

export default function Type({ race }) {
  return (
    <td><div>{race.type}</div></td>
  );
}

Type.propTypes = {
  race: PropTypes.object.isRequired
};
