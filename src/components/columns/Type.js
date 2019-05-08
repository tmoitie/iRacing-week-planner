import React from 'react';
import PropTypes from 'prop-types';

export default function Type({ race }) {
  return (
    <td><div>{race.type}</div></td>
  );
}

Type.propTypes = {
  race: PropTypes.object.isRequired
};
