import Table from 'cli-table';
import {uniqBy} from 'lodash';
import moment from 'moment';

import races from './src/lib/races';

const seriess = uniqBy(races, (race) => race.seriesId);
const table = new Table({
  head: [
    'ID', 'Name', 'Week Length', 'Week Day', 'End'
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

table.push(...seriess.map(series => [
  series.seriesId,
  series.series,
  series.weekLength.asWeeks(),
  moment(series.startTime).local().format('ddd'),
  moment(series.seriesEnd).local().format('YYYY-MM-DD')
]));

console.log(table.toString());
