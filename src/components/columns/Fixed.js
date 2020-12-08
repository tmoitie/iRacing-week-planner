// @flow

import * as React from 'react';
import TickIcon from '../icon/TickIcon';

type Props = {
  race: {
    fixed: boolean,
  }
};

export default function Fixed({ race }: Props) {
  return (
    <td>
      <div>
        {race.fixed && <TickIcon />}
      </div>
    </td>
  );
}
