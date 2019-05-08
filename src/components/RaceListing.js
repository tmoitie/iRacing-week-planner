import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { clone } from 'lodash';

import allRaces from '../lib/races';
import filterRaces from '../lib/filterRaces';
import sortRaces from '../lib/sortRaces';

import availableColumns from '../data/availableColumns';

import './styles/raceListing.scss';

export default class RaceListing extends Component {
  static propTypes = {
    date: PropTypes.object,
    sort: PropTypes.object,
    filters: PropTypes.object,
    favouriteSeries: PropTypes.array,
    ownedTracks: PropTypes.array,
    ownedCars: PropTypes.array,
    favouriteCars: PropTypes.array,
    favouriteTracks: PropTypes.array,
    columnIds: PropTypes.array,
    updateSort: PropTypes.func
  }

  static defaultProps = {
    date: moment().utc().startOf('day'),
    sort: { key: 'licence', order: 'asc' },
    filters: [],
    favouriteSeries: [],
    ownedTracks: [],
    ownedCars: [],
    favouriteCars: [],
    favouriteTracks: [],
    updateSort: () => {}
  }

  sortColumn(columnId) {
    const { sort, updateSort } = this.props;
    let newSort = clone(sort);

    if (sort.key === columnId) {
      newSort.order = sort.order === 'asc' ? 'desc' : 'asc';
      updateSort(newSort);
      return;
    }

    newSort = { key: columnId, order: 'asc' };
    updateSort(newSort);
  }

  renderSortArrow() {
    const { sort } = this.props;
    if (sort.order === 'desc') {
      return <span className='glyphicon glyphicon-triangle-bottom' />;
    }

    return <span className='glyphicon glyphicon-triangle-top' />;
  }

  render() {
    const { date, sort, filters, favouriteSeries, ownedTracks, ownedCars,
      favouriteCars, favouriteTracks, columnIds } = this.props;

    let races = allRaces.filter((race) => moment(date).add(1, 'hour').isBetween(race.startTime, race.endTime));

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

    const columns = availableColumns.filter((column) => columnIds.indexOf(column.id) !== -1);

    return (
      <div className='table-responsive race-listing'>
        <table className='table' style={{ fontSize: '0.8em' }}>
          <thead>
            <tr>
              {columns.map((column, colNum) => (
                <th
                  key={colNum}
                  onClick={column.sort ? this.sortColumn.bind(this, column.id, column.defaultOrder) : () => {}}
                  className={column.sort ? 'clickable-cell' : null}
                >
                  {column.header}
                  <span> </span>
                  {sort.key === column.id ? this.renderSortArrow() : null}
                </th>
              ))}
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
