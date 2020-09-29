import React, { useMemo } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import type { filters } from '../reducers/settings';
import SortArrow from './SortArrow';

import allRaces from '../lib/races';
import filterRaces from '../lib/filterRaces';
import sortRaces from '../lib/sortRaces';

import availableColumns from '../data/availableColumns';

import './styles/raceListing.scss';

import type sort from '../reducers/settings';

type Props = {
  date: moment.Moment,
  sort: sort,
  filters: filters,
  favouriteSeries: Array<number>,
  ownedTracks: Array<number>,
  ownedCars: Array<number>,
  favouriteCars: Array<number>,
  favouriteTracks: Array<number>,
  columnIds: Array<string>,
  updateSort: (sort) => void,
  t: (string) => string,
};

export default function RaceListing({
  sort, updateSort, date, filters, favouriteSeries, ownedTracks, ownedCars, favouriteCars, favouriteTracks, columnIds
}: Props): React.Node {
  const { t } = useTranslation();

  const getSortColumnHandler = (columnId: string) => () => {
    let newSort = { ...sort };

    if (sort.key === columnId) {
      newSort.order = sort.order === 'asc' ? 'desc' : 'asc';
      updateSort(newSort);
      return;
    }

    newSort = { key: columnId, order: 'asc' };
    updateSort(newSort);
  };

  const dateFilteredRaces = useMemo(() => allRaces.filter(
    (race) => moment(date).add(1, 'hour').isBetween(race.startTime, race.endTime)
  ), [date]);

  const sortedRaces = useMemo(() => sortRaces(sort, dateFilteredRaces), [sort, dateFilteredRaces]);

  const filteredRaces = useMemo(() => filterRaces({
    races: sortedRaces, filters, ownedTracks, ownedCars, favouriteSeries, favouriteCars, favouriteTracks
  }), [sortedRaces, filters, ownedTracks, ownedCars, favouriteSeries, favouriteCars, favouriteTracks]);

  if (filters.favouriteSeries && filteredRaces.length === 0) {
    return <p>{t('No races this week match your favourite series. Try turning the filter off or adding some.')}</p>;
  }

  if (filters.favouriteCarsOnly && filteredRaces.length === 0) {
    return <p>{t('No races this week match your favourite cars. Try turning the filter off or adding some.')}</p>;
  }

  if (filters.favouriteTracksOnly && filteredRaces.length === 0) {
    return <p>{t('No races this week match your favourite tracks. Try turning the filter off or adding some.')}</p>;
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
              id={`raceListing-th-${column.id}`}
              onClick={column.sort ? getSortColumnHandler(column.id) : () => {}}
              className={column.sort ? 'clickable-cell' : null}
            >
              {t(column.header)}
              <span> </span>
              {sort.key === column.id ? <SortArrow sort={sort} /> : null}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {filteredRaces.map((race, index) => (
          <tr key={index}>
            {columns.map((column, colNum) => (
              <column.component
                key={colNum} race={race} ownedCars={ownedCars} favouriteCars={favouriteCars} ownedTracks={ownedTracks}
                favouriteTracks={favouriteTracks} favouriteSeries={favouriteSeries}
              />
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
