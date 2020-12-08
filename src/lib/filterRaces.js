import intersection from 'lodash.intersection';

export default function filterRaces({
  races, filters, ownedTracks, ownedCars, favouriteSeries, favouriteCars, favouriteTracks,
}) {
  let filteredRaces = [...races];

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
