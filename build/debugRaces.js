import Table from 'cli-table';
import uniqBy from 'lodash.uniqby';
import moment from 'moment';

import races from '../src/lib/races';

const seriesIds = process.argv.slice(2).map(id => parseInt(id, 10));

let seriess = uniqBy(races, (race) => race.seriesId);
const table = new Table({
  head: [
    'ID', 'Name', 'Week Length', 'Week Day', 'Start', 'End', 'Next time'
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

table.push(...seriess.map(series => [
  series.seriesId,
  series.series,
  series.weekLength.asDays(),
  moment(series.startTime).local().format('ddd'),
  moment(series.seriesStart).local().format('YYYY-MM-DD'),
  moment(series.seriesEnd).local().format('YYYY-MM-DD'),
  series.nextTime !== null ? moment(series.nextTime).local().format('ddd h:mma') : 'NO DATA'
]));

console.log(table.toString());
