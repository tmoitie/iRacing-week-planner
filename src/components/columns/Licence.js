// @flow

import * as React from 'react';
import LicenceLevel from '../LicenceLevel';

type Props = {
  race: {
    licenceLevel: number,
  }
};

export default function Licence({ race }: Props) {
  return (
    <td><LicenceLevel licence={race.licenceLevel} /></td>
  );
}

