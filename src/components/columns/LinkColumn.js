// @flow

import * as React from 'react';
import LinkIcon from '../icon/LinkIcon';

type Props = {
  race: {
    seasonId: number,
  }
};

export default function LinkColumn({ race }: Props) {
  return (
    <td>
      <a
        href={`https://members-ng.iracing.com/web/racing/official/series-list/${race.seasonId}/go-racing`}
        target="_blank"
        rel="noreferrer"
        data-testid="LinkColumn-link"
      >
        <LinkIcon />
      </a>
    </td>
  );
}
