/* eslint-disable no-console */

import Table from 'cli-table';
import uniqBy from 'lodash.uniqby';
import moment from 'moment';

import races, { getNextRace } from '../src/lib/races';

const seriesIds = process.argv.slice(2).map((id) => parseInt(id, 10));

let seriess = uniqBy(races, (race) => race.seriesId);
const table = new Table({
  head: [
    'ID', 'Type', 'Class', 'Name', 'Week Length', 'Week Day', 'Start', 'End', 'Next time',
  ],
  chars: {
    top: '═',
    'top-mid': '╤',
    'top-left': '╔',
    'top-right': '╗',
    bottom: '═',
    'bottom-mid': '╧',
    'bottom-left': '╚',
    'bottom-right': '╝',
    left: '║',
    'left-mid': '╟',
    mid: '─',
    'mid-mid': '┼',
    right: '║',
    'right-mid': '╢',
    middle: '│',
  },
});

if (seriesIds.length > 0) {
  seriess = seriess.filter((series) => seriesIds.includes(series.seriesId));
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

const now = moment().utc();

table.push(...seriess.map((series) => {
  const nextTime = getNextRace(now, series);
  return [
    series.seriesId,
    series.type,
    series.licenceClass,
    series.series,
    series.weekLength.asDays(),
    moment(series.startTime).local().format('ddd'),
    moment(series.seriesStart).local().format('YYYY-MM-DD'),
    moment(series.seriesEnd).local().format('YYYY-MM-DD'),
    nextTime !== null ? nextTime.local().format('ddd h:mma') : 'NO DATA',
  ];
}));

console.log(table.toString());

process.exit(0);
