// @flow

import intersection from 'lodash.intersection';
import type { SeriesRace } from './races';
import type { FilterOptions } from '../reducers/settings';

type FilterArguments = {
  races: Array<SeriesRace>,
  filters: FilterOptions,
  ownedTracks: Array<number>,
  ownedCars: Array<number>,
  favouriteSeries: Array<number>,
  favouriteCars: Array<number>,
  favouriteTracks: Array<number>,
};

export default function filterRaces({
  races, filters, ownedTracks, ownedCars, favouriteSeries, favouriteCars, favouriteTracks,
}: FilterArguments) {
  let filteredRaces: Array<SeriesRace> = [...races];

  filteredRaces = filteredRaces.filter((race) => filters.type.indexOf(race.type) !== -1);

  filteredRaces = filteredRaces.filter((race) => filters.licence.indexOf(race.licenceClass) !== -1);

  filteredRaces = filteredRaces.filter((race) => filters.fixed.indexOf(race.fixed) !== -1);

  filteredRaces = filteredRaces.filter((race) => filters.official.indexOf(race.official) !== -1);

  if (filters.ownedTracks) {
    filteredRaces = filteredRaces.filter((race) => ownedTracks.indexOf(race.trackId) !== -1);
  }

  if (filters.ownedCars) {
    filteredRaces = filteredRaces.filter((race) => intersection(ownedCars, race.carIds).length !== 0);
  }

  if (filters.favouriteSeries) {
    filteredRaces = filteredRaces.filter((race) => favouriteSeries.indexOf(race.seriesId) !== -1);
  }

  if (filters.favouriteCarsOnly) {
    filteredRaces = filteredRaces.filter((race) => intersection(favouriteCars, race.carIds).length !== 0);
  }

  if (filters.favouriteTracksOnly) {
    filteredRaces = filteredRaces.filter((race) => favouriteTracks.indexOf(race.trackId) !== -1);
  }

  return filteredRaces;
}
