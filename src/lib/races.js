import season from '../data/season.json';
import levelToClass from './levelToClass';
import raceTimesArray from '../data/raceTimes';
import moment, {duration} from 'moment';

const raceTimesById = raceTimesArray.reduce((races, race) => {
  races[race.seriesId] = race;
  return races;
}, {});

const now = moment().utc();
const startOfWeek = now.clone().subtract(1, 'days').startOf('isoWeek').add(1, 'days');

function getNextRaceFromRecur(everyTime, offset) {
  const nextDate = startOfWeek.clone().add(offset);
  const endDate = startOfWeek.clone().add({ weeks: 1, days: 1});

  while (nextDate.isBefore(now) && nextDate.isBefore(endDate)) {
    nextDate.add(everyTime);
  }

  if (nextDate.isBefore(now)) {
    return null;
  }

  return nextDate;
}

function getNextRaceSetTimes(setTimes) {
  for (const time of setTimes) {
    const date = startOfWeek.clone().add(time);
    if (date.isAfter(now)) {
      return date;
    }
  }

  const firstNextWeek = startOfWeek.clone().add(1, 'weeks').add(setTimes[0]);

  if (firstNextWeek.isAfter(now)) {
    return firstNextWeek;
  }

  return null;
}

const fixText = (text) => (decodeURIComponent(text).replace(/\+/g, ' '));

export default season.reduce((carry, series) => {
  const seriesName = fixText(series.seriesname);
  const seriesStart = moment(series.start, 'x').utc().startOf('day');
  const seriesEnd = moment(series.end, 'x').utc().startOf('day');
  const raceWeekLength = Math.round(moment(seriesEnd).diff(seriesStart) / series.tracks.length);

  return carry.concat(series.tracks.map((track) => {
    const trackName = track.config ? `${track.name} - ${track.config}` : track.name;

    const raceTimes = raceTimesById[series.seriesid] || null;
    let nextTime = null;

    if (raceTimes.everyTime) {
      nextTime = getNextRaceFromRecur(raceTimes.everyTime, raceTimes.offset);
    }

    if (raceTimes.setTimes) {
      nextTime = getNextRaceSetTimes(raceTimes.setTimes);
    }

    return {
      series: seriesName,
      seriesId: series.seriesid,
      track: fixText(trackName),
      trackId: track.pkgid,
      week: track.raceweek,
      startTime: moment(seriesStart).add(raceWeekLength * track.raceweek, 'ms').startOf('day').utc(),
      weekLength: duration(raceWeekLength),
      official: series.isOfficial,
      licenceLevel: series.minlicenselevel,
      licenceClass: levelToClass(series.minlicenselevel, true),
      type: series.catid === 1 ? 'Oval' : 'Road',
      fixed: series.isFixedSetup,
      carClasses: series.carclasses.map((carClass) => fixText(carClass.shortname)),
      carIds: series.cars.map((car) => car.sku),
      raceTimes: raceTimes,
      nextTime: nextTime
    };
  }));
}, []);
