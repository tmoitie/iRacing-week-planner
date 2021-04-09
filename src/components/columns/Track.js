// @flow

import * as React from 'react';
import classnames from 'classnames';
import StarIcon from '../icon/StarIcon';
import TrackModal from '../modal/TrackModal';
import ClickableCell from './ClickableCell';
import styles from '../../styles/main.module.scss';

type Props = {
  race: {
    trackId: number,
    track: string,
  },
  favouriteTracks: Array<number>,
  ownedTracks: Array<number>,
};

export default function Track({ ownedTracks, race, favouriteTracks }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <ClickableCell 
        className={classnames({
          [styles.success]: ownedTracks.indexOf(race.trackId) !== -1,
        })}
        onClick={openModal}
        >
          {favouriteTracks.indexOf(race.trackId) !== -1 ? (
            <StarIcon />
          ) : null}
          <span> </span>
          {race.track}
      </ClickableCell>
      <TrackModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          trackId={race.trackNumber}
          track={race.track}
        />
    </>
  );
}
