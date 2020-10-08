import Table from 'cli-table';
import uniqBy from 'lodash.uniqby';
import moment from 'moment';

import races from '../src/lib/races';
import raceTimes from '../src/data/raceTimes';

const seriesIds = process.argv.slice(2).map(id => parseInt(id, 10));

let seriess = uniqBy(races, (race) => race.seriesId);
const table = new Table({
  head: [
    'ID', 'Type', 'Class', 'Name', 'Week Length', 'Week Day', 'Start', 'End', 'Next time'
  ],
  chars: {
    top: '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
    bottom: '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
    left: '║', 'left-mid': '╟',
    mid: '─', 'mid-mid': '┼',
    right: '║', 'right-mid': '╢',
    middle: '│'
  }
});

if (seriesIds.length > 0) {
  seriess = seriess.filter(series => seriesIds.includes(series.seriesId));
}

seriess.sort((a, b) => {
  if (a.type !== b.type) {
    return a.type < b.type ? -1 : 1;
  }

  if (a.licenceLevel !== b.licenceLevel) {
    return a.licenceLevel - b.licenceLevel;
  }

  return a.series < b.series ? -1 : 1;

});

table.push(...seriess.map(series => [
  series.seriesId,
  series.type,
  series.licenceClass,
  series.series,
  series.weekLength.asDays(),
  moment(series.startTime).local().format('ddd'),
  moment(series.seriesStart).local().format('YYYY-MM-DD'),
  moment(series.seriesEnd).local().format('YYYY-MM-DD'),
  series.nextTime !== null ? moment(series.nextTime).local().format('ddd h:mma') : 'NO DATA'
]));

console.log(table.toString());

const allSeriesIds = seriess.map(series => series.seriesId);
const allRaceTimesIds = raceTimes.map(series => series.seriesId);

const notInRaceTimes = allSeriesIds.filter(
  seriesId => !allRaceTimesIds.find(raceTime => raceTime === seriesId)
);
const notInSeriesIds = allRaceTimesIds.filter(
  raceTime => !allSeriesIds.find(seriesId => raceTime === seriesId)
);
const noRaceTimes = seriess.filter(
  series => series.nextTime === null && ![328].includes(series.seriesId)
).map(series => series.seriesId);

console.log(`The following IDS are not in Race Times: ${notInRaceTimes.join(',')}`);
console.log(`The following IDs are in Race Times but not used: ${notInSeriesIds.join(',')}`);
console.log(`The following IDs don't have race times: ${noRaceTimes.join(',')}`);

if (notInRaceTimes.length || noRaceTimes.length) {
  process.exit(1);
}

process.exit(0);
