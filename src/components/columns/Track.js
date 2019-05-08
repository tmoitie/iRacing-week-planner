import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Track({ ownedTracks, race, favouriteTracks }) {
  return (
    <td className={classnames({ success: ownedTracks.indexOf(race.trackId) !== -1 })}>
      <div>
        {favouriteTracks.indexOf(race.trackId) !== -1 ? (
          <span className='glyphicon glyphicon-star' />
        ) : null}<span> </span>
        {race.track}
      </div>
    </td>
  );
}

Track.propTypes = {
  race: PropTypes.object.isRequired,
  ownedTracks: PropTypes.array.isRequired,
  favouriteTracks: PropTypes.array.isRequired
};
