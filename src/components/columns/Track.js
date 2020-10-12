// @flow

import * as React from 'react';
import classnames from 'classnames';
import StarIcon from '../icon/StarIcon';

type Props = {
  race: {
    trackId: number,
    track: string,
  },
  favouriteTracks: Array<number>,
  ownedTracks: Array<number>,
};

export default function Track({ ownedTracks, race, favouriteTracks }: Props) {
  return (
    <td className={classnames({ success: ownedTracks.indexOf(race.trackId) !== -1 })}>
      <div>
        {favouriteTracks.indexOf(race.trackId) !== -1 ? (
          <StarIcon />
        ) : null}
        <span> </span>
        {race.track}
      </div>
    </td>
  );
}
