import React from 'react';
import PropTypes from 'prop-types';
import LicenceLevel from '../LicenceLevel';

export default function Class({ race }) {
  return (
    <td><LicenceLevel effective licence={race.licenceLevel} /></td>
  );
}

Class.propTypes = {
  race: PropTypes.object.isRequired
};
