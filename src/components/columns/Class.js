// @flow

import * as React from 'react';
import LicenceLevel from '../LicenceLevel';

type Props = {
  race: {
    licenceLevel: number,
  }
};

export default function Class({ race }: Props) {
  return (
    <td><LicenceLevel effective licence={race.licenceLevel} /></td>
  );
}
