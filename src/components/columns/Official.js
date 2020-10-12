// @flow

import * as React from 'react';
import TickIcon from '../icon/TickIcon';

type Props = {
  race: {
    official: boolean,
  }
};

export default function Official({ race }: Props) {
  return (
    <td>
      <div>
        {race.official && <TickIcon />}
      </div>
    </td>
  );
}
