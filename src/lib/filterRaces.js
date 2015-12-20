import {clone, intersection} from 'lodash';

export default function({
  races, filters, ownedTracks, ownedCars, favouriteSeries, favouriteCars, favouriteTracks
}) {
  let filteredRaces = clone(races);

  filteredRaces = filteredRaces.filter((race) => {
    return filters.type.indexOf(race.type) !== -1;
  });

  filteredRaces = filteredRaces.filter((race) => {
    return filters.licence.indexOf(race.licenceClass) !== -1;
  });

  filteredRaces = filteredRaces.filter((race) => {
    return filters.fixed.indexOf(race.fixed) !== -1;
  });

  filteredRaces = filteredRaces.filter((race) => {
    return filters.official.indexOf(race.official) !== -1;
  });

  if (filters.ownedTracks) {
    filteredRaces = filteredRaces.filter((race) => {
      return ownedTracks.indexOf(race.trackId) !== -1;
    });
  }

  if (filters.ownedCars) {
    filteredRaces = filteredRaces.filter((race) => {
      return intersection(ownedCars, race.carIds).length !== 0;
    });
  }

  if (filters.favouriteSeries) {
    filteredRaces = filteredRaces.filter((race) => {
      return favouriteSeries.indexOf(race.seriesId) !== -1;
    });
  }

  if (filters.favouriteCarsOnly) {
    filteredRaces = filteredRaces.filter((race) => {
      return intersection(favouriteCars, race.carIds).length !== 0;
    });
  }

  if (filters.favouriteTracksOnly) {
    filteredRaces = filteredRaces.filter((race) => {
      return favouriteTracks.indexOf(race.trackId) !== -1;
    });
  }

  return filteredRaces;
}
