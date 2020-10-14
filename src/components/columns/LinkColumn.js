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
        href={`http://members.iracing.com/membersite/member/SeriesSessions.do?season=${race.seasonId}`}
        target="_blank"
        rel="noreferrer"
      >
        <LinkIcon />
      </a>
    </td>
  );
}
