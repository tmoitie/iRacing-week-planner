// @flow

import * as React from 'react';

type Props = {
  race: {
    seriesId: number,
  }
};

export default function Id({ race: { seriesId } }: Props) {
  return (
    <td>
      <div>
        {seriesId}
      </div>
    </td>
  );
}
