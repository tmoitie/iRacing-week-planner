import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import allRaces from '../lib/races';
import filterRaces from '../lib/filterRaces';
import sortRaces from '../lib/sortRaces';

import availableColumns from '../data/availableColumns';

import './styles/raceListing.scss';

export default class RaceListing extends Component {
  static propTypes = {
    time: PropTypes.number,
    sort: PropTypes.array,
    filters: PropTypes.object,
    favouriteSeries: PropTypes.array,
    ownedTracks: PropTypes.array,
    ownedCars: PropTypes.array,
    favouriteCars: PropTypes.array,
    favouriteTracks: PropTypes.array,
    columnIds: PropTypes.array
  }

  static defaultProps = {
    time: Math.round(moment().format('X')),
    sort: [{key: 'licenceLevel', order: 'asc'}, {key: 'series', order: 'asc'}],
    filters: [],
    favouriteSeries: [],
    ownedTracks: [],
    ownedCars: [],
    favouriteCars: [],
    favouriteTracks: []
  }

  render() {
    const { time, sort, filters, favouriteSeries, ownedTracks, ownedCars,
      favouriteCars, favouriteTracks, columnIds } = this.props;
    let races = allRaces.filter((race) => {
      return race.startTime < (time * 1000) && (time * 1000) < (race.startTime + race.weekLength);
    });

    races = sortRaces(sort, races);

    races = filterRaces({
      races, filters, ownedTracks, ownedCars, favouriteSeries, favouriteCars, favouriteTracks
    });

    if (filters.favouriteSeries && races.length === 0) {
      return <p>No races this week match your favourite series. Try turning the filter off or adding some.</p>;
    }

    if (filters.favouriteCarsOnly && races.length === 0) {
      return <p>No races this week match your favourite cars. Try turning the filter off or adding some.</p>;
    }

    if (filters.favouriteTracksOnly && races.length === 0) {
      return <p>No races this week match your favourite tracks. Try turning the filter off or adding some.</p>;
    }

    const keyedColumns = availableColumns.reduce((carry, column) => {
      carry[column.id] = column;
      return carry;
    }, {});

    const columns = columnIds.map(columnId => keyedColumns[columnId]);

    return (
      <div className='table-responsive race-listing'>
        <table className='table' style={{fontSize: '0.8em'}}>
          <thead>
            <tr>
              {columns.map((column, colNum) => <th key={colNum}>{column.header}</th>)}
            </tr>
          </thead>
          <tbody>
            {races.map((race, index) => (
              <tr key={index}>
                {columns.map((column, colNum) => (
                  <column.component key={colNum} race={race} {...this.props} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
