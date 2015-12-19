import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Track extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    ownedTracks: PropTypes.array.isRequired,
    favouriteTracks: PropTypes.array.isRequired
  }

  render() {
    const { ownedTracks, race, favouriteTracks } = this.props;

    return (
      <td className={classnames({success: ownedTracks.indexOf(race.trackId) !== -1})}>
        {favouriteTracks.indexOf(race.trackId) !== -1 ? (
          <span className='glyphicon glyphicon-star' />
        ) : null}<span> </span>
        {race.track}
      </td>
    );
  }
}
