import React, { PropTypes } from 'react';
import LicenceLevel from '../LicenceLevel';

export default function Class({ race }) {
  return (
    <td><LicenceLevel effective licence={race.licenceLevel} /></td>
  );
}

Class.propTypes = {
  race: PropTypes.object.isRequired
};
