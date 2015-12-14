import season from '../data/season.json';
import levelToClass from './levelToClass';

const fixText = (text) => (decodeURIComponent(text).replace(/\+/g, ' '));

const races = season.reduce((carry, season) => {
  const seriesName = fixText(season.seriesname);
  const raceWeekLength = Math.round((season.end - season.start) / season.tracks.length);

  return carry.concat(season.tracks.map((track) => {
    const trackName = track.config ? `${track.name} - ${track.config}` : track.name;

    return {
      series: seriesName,
      seriesId: season.seriesid,
      track: fixText(trackName),
      trackId: track.pkgid,
      week: track.raceweek,
      startTime: season.start + (raceWeekLength * track.raceweek),
      weekLength: raceWeekLength,
      official: season.isOfficial,
      licenceLevel: season.minlicenselevel,
      licenceClass: levelToClass(season.minlicenselevel, true),
      type: season.catid === 1 ? 'Oval' : 'Road',
      fixed: season.isFixedSetup,
      carClasses: season.carclasses.map((carClass) => fixText(carClass.shortname)),
      carIds: season.cars.map((car) => car.sku)
    };
  }))
}, []);

export default races;
