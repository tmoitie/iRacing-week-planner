import React, { PropTypes } from 'react';
import LicenceLevel from '../LicenceLevel';

export default function Licence({ race }) {
  return (
    <td><LicenceLevel licence={race.licenceLevel} /></td>
  );
}

Licence.propTypes = {
  race: PropTypes.object.isRequired
};
