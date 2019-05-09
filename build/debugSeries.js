import Table from 'cli-table';
import moment from 'moment';

import allRaces from '../src/lib/races';

const seriesId = parseInt(process.argv[2], 10);
const races = allRaces.filter(race => race.seriesId === seriesId);

const table = new Table({
  head: [
    'ID', 'Name', 'Week Length', 'Start', 'End', 'Season Start', 'Season End'
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

table.push(...races.map(race => [
  race.seriesId,
  race.series,
  race.weekLength.asDays(),
  moment(race.startTime).local().format('ddd YYYY-MM-DD'),
  moment(race.endTime).local().format('ddd YYYY-MM-DD'),
  moment(race.seriesStart).local().format('ddd YYYY-MM-DD'),
  moment(race.seriesEnd).local().format('ddd YYYY-MM-DD'),
]));

console.log(table.toString());
