import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import moment from 'moment';
import classnames from 'classnames';

import allRaces from '../../lib/races';

const now = moment().utc();

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
                  const raceWeekEnd = moment(race.startTime).add(race.weekLength);
                  const current = now.isBetween(race.startTime, raceWeekEnd);
                  return (
                    <tr key={index} style={current ? { fontWeight: 700 } : {}}>
                      <td>
                        {race.week + 1}
                      </td>
                      <td className={classnames({success: ownedTracks.indexOf(race.trackId) !== -1})}>
                        {race.track}
                      </td>
                      <td>{moment(race.startTime).local().format('YYYY-MM-DD')}</td>
                      <td>{
                        moment(race.startTime).local().add(race.weekLength).subtract(1, 'days').format('YYYY-MM-DD')
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
