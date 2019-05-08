import React from 'react';
import PropTypes from 'prop-types';
import LicenceLevel from '../LicenceLevel';

export default function Licence({ race }) {
  return (
    <td><LicenceLevel licence={race.licenceLevel} /></td>
  );
}

Licence.propTypes = {
  race: PropTypes.object.isRequired
};
