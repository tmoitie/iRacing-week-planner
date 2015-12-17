import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import moment from 'moment';
import classnames from 'classnames';

import allRaces from '../../lib/races';

const now = parseInt(moment().hour(11).format('X'), 10);

const fixText = (text) => (decodeURIComponent(text).replace(/\+/g, ' '));

export default class SeriesModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    seriesId: PropTypes.number.isRequired,
    ownedTracks: PropTypes.array
  }

  static defaultProps = {
    onClose: () => {},
    ownedTracks: [],
  }

  render() {
    const {onClose, ownedTracks, seriesId} = this.props;
    const races = allRaces.filter(race => race.seriesId === seriesId);

    return (
      <Modal onClose={onClose} title={`Tracks for ${races[0].series}`} doneAction={onClose}>
        <div className="container-fluid">
          <div className="table-responsive">
            <table className="table" style={{fontSize: '0.8em'}}>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Track</th>
                  <th>Start</th>
                  <th>End</th>
                </tr>
              </thead>
              <tbody>
                {races.map((race, index) => {
                  const current = race.startTime < (now * 1000) && (now * 1000) < (race.startTime + race.weekLength);
                  return (
                    <tr key={index} style={current ? { fontWeight: 700 } : {}}>
                      <td>
                        {race.week + 1}
                      </td>
                      <td className={classnames({success: ownedTracks.indexOf(race.trackId) !== -1})}>
                        {race.track}
                      </td>
                      <td>{moment(race.startTime, 'x').format('YYYY-MM-DD')}</td>
                      <td>{
                        moment(race.startTime + race.weekLength, 'x').subtract(1, 'days').format('YYYY-MM-DD')
                      }</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    );
  }
}
