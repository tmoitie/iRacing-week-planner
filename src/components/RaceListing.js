// @flow

import * as React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import type { filters as filtersType, sort as sortType } from '../reducers/settings';
import SortArrow from './SortArrow';

import allRaces from '../lib/races';
import filterRaces from '../lib/filterRaces';
import sortRaces from '../lib/sortRaces';

import availableColumns from '../data/availableColumns';

import styles from '../styles/main.module.scss';
import raceListingStyles from './styles/raceListing.module.scss';

type Props = {
  date: moment.Moment,
  sort: sortType,
  filters: filtersType,
  favouriteSeries: Array<number>,
  ownedTracks: Array<number>,
  ownedCars: Array<number>,
  favouriteCars: Array<number>,
  favouriteTracks: Array<number>,
  columnIds: Array<string>,
  updateSort: (sortType) => void,
};

export default function RaceListing({
  sort, updateSort, date, filters, favouriteSeries, ownedTracks, ownedCars, favouriteCars, favouriteTracks, columnIds,
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

  const dateFilteredRaces = React.useMemo(() => allRaces.filter(
    (race) => moment(date).add(1, 'hour').isBetween(race.startTime, race.endTime),
  ), [date]);

  const sortedRaces = React.useMemo(() => sortRaces(sort, dateFilteredRaces), [sort, dateFilteredRaces]);

  const filteredRaces = React.useMemo(() => filterRaces({
    races: sortedRaces, filters, ownedTracks, ownedCars, favouriteSeries, favouriteCars, favouriteTracks,
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
    <div className={`${styles['table-responsive']} ${raceListingStyles.raceListing}`}>
      <table className={styles.table} style={{ fontSize: '0.8em' }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                id={`raceListing-th-${column.id}`}
                onClick={column.sort ? getSortColumnHandler(column.id) : () => {}}
                className={column.sort ? raceListingStyles.clickableCell : null}
              >
                {t(column.header)}
                <span> </span>
                {sort.key === column.id ? <SortArrow sort={sort} /> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRaces.map((race) => (
            <tr key={race.seriesId}>
              {columns.map((column) => (
                <column.component
                  key={column.id}
                  race={race}
                  ownedCars={ownedCars}
                  favouriteCars={favouriteCars}
                  ownedTracks={ownedTracks}
                  favouriteTracks={favouriteTracks}
                  favouriteSeries={favouriteSeries}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
