// @flow

import moment from 'moment';
import series from '../data/season.json';
import tracks from '../data/tracks.json';
import cars from '../data/cars.json';

const getTracks = (allTracks, eligibleWeeks) => allTracks.reduce((acc, track) => {
  const week = eligibleWeeks.find((w) => w.pkgid === track.pkgid);
  if (week) {
    acc.push({ ...track, week: week.raceweek + 1, hasRun: moment(week.end).isBefore(moment(), 'day') });
  }
  return acc;
}, []);

export default function calculateCreditProgram({ ownedTracks, ownedCars }) {
  const creditProgramSeries = [];

  series.forEach((serie) => {
    if (serie.minlicenselevel < 4) return;

    const eligibleWeeks = [];

    serie.tracks.forEach((weekTrack) => {
      if (!ownedTracks.includes(weekTrack.pkgid)) return;

      let ownsCar = false;

      if (weekTrack.carsForWeek.length > 0) {
        ownsCar = weekTrack.carsForWeek.some((carSku) => ownedCars.includes(carSku));
      } else {
        ownsCar = serie.cars.some((car) => ownedCars.includes(car.sku));
      }

      if (ownsCar) {
        eligibleWeeks.push({
          pkgid: weekTrack.pkgid,
          raceweek: weekTrack.raceweek,
          end: moment(weekTrack.start).add(weekTrack.weekLength || 7, 'days'),
        });
      }
    });

    if (eligibleWeeks.length >= 8) {
      let serieCarsIds = [];

      if (serie.tracks.some((t) => t.carsForWeek && t.carsForWeek.length > 0)) {
        serieCarsIds = serie.tracks.flatMap((t) => t.carsForWeek);
      } else {
        serieCarsIds = serie.cars.map((c) => c.sku);
      }

      const eligibleCars = cars.filter(
        (c) => ownedCars.includes(c.sku) && serieCarsIds.includes(c.sku),
      );

      creditProgramSeries.push({
        name: serie.seriesname,
        licenceLevel: serie.minlicenselevel,
        weeks: eligibleWeeks.map((w) => w.raceweek + 1),
        tracks: getTracks(tracks, eligibleWeeks),
        cars: eligibleCars,
      });
    }
  });

  return creditProgramSeries;
}
