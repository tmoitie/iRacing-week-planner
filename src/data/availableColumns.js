// @flow

import type { ElementType } from 'react';
import moment from 'moment';
import {
  Id, Car, Class, EndDate, Fixed, Licence, LinkColumn, NextRace, Official,
  RaceTimes, Series, SeasonEnd, StartDate, Track, Type,
} from '../components/columns';
import RaceLength from '../components/columns/RaceLength';
import { getNextRace } from '../lib/races';
import type { SeriesRace } from '../lib/races';

/* eslint react/no-multi-comp: 0 */

const defaultSort = (order: 'asc' | 'desc', a: SeriesRace, b: SeriesRace) => {
  if (a.licenceClassNumber === b.licenceClassNumber) {
    if (a.series === b.series) {
      return 0;
    }

    if (order === 'asc') {
      return a.series.toLowerCase() < b.series.toLowerCase() ? -1 : 1;
    }

    return a.series.toLowerCase() < b.series.toLowerCase() ? 1 : -1;
  }

  if (order === 'asc') {
    return a.licenceClassNumber < b.licenceClassNumber ? -1 : 1;
  }

  return a.licenceClassNumber < b.licenceClassNumber ? 1 : -1;
};

const sortByDate = (order: 'asc' | 'desc', a?: moment$Moment, b?: moment$Moment) => {
  if (a === b) {
    return 0;
  }
  if (a === undefined) {
    return 1;
  }
  if (b === undefined) {
    return -1;
  }
  if (a.isSame(b)) {
    return 0;
  }
  if (order === 'asc') {
    return a.isBefore(b) ? -1 : 1;
  }

  return a.isAfter(b) ? -1 : 1;
};

const getSortByDate = (key) => (order: 'asc' | 'desc', a: SeriesRace, b: SeriesRace) => {
  const sort = sortByDate(order, a[key], b[key]);
  return sort !== 0 ? sort : defaultSort(order, a, b);
};

export type ColumnType = {
  id: string,
  header: string,
  component: ElementType,
  default?: boolean,
  sort?: (order: 'asc' | 'desc', a: SeriesRace, b: SeriesRace) => number,
};

const availableColumns: Array<ColumnType> = [{
  id: 'id',
  header: 'ID',
  component: Id,
  default: false,
  sort: (order, a, b) => {
    if (a.seriesId === b.seriesId) {
      return defaultSort(order, a, b);
    }
    if (order === 'asc') {
      return (a.seriesId < b.seriesId ? -1 : 1);
    }
    return (a.seriesId > b.seriesId ? -1 : 1);
  },
}, {
  id: 'class',
  header: 'Class',
  component: Class,
  default: true,
  sort: (order, a, b) => {
    return defaultSort(order, a, b);
  },
}, {
  id: 'licence',
  header: 'Licence',
  component: Licence,
  default: true,
  sort: (order, a, b) => {
    if (a.licenceLevel === b.licenceLevel) {
      return defaultSort(order, a, b);
    }
    if (order === 'asc') {
      return a.licenceLevel < b.licenceLevel ? -1 : 1;
    }
    return a.licenceLevel > b.licenceLevel ? -1 : 1;
  },
}, {
  id: 'type',
  header: 'Type',
  component: Type,
  default: true,
  sort: (order, a, b) => {
    if (a.type === b.type) {
      return defaultSort(order, a, b);
    }
    if (order === 'asc') {
      return (a.type < b.type ? -1 : 1);
    }
    return (a.type > b.type ? -1 : 1);
  },
}, {
  id: 'series',
  header: 'Series',
  component: Series,
  default: true,
  forced: true,
  sort: (order, a, b) => {
    if (a.series === b.series) {
      return 0;
    }
    if (order === 'asc') {
      return (a.series.toLowerCase() < b.series.toLowerCase() ? -1 : 1);
    }
    return (a.series.toLowerCase() > b.series.toLowerCase() ? -1 : 1);
  },
}, {
  id: 'track',
  header: 'Track',
  component: Track,
  default: true,
  sort: (order, a, b) => {
    if (a.track === b.track) {
      return defaultSort(order, a, b);
    }
    if (order === 'asc') {
      return (a.track.toLowerCase() < b.track.toLowerCase() ? -1 : 1);
    }
    return (a.track.toLowerCase() > b.track.toLowerCase() ? -1 : 1);
  },
}, {
  id: 'car',
  header: 'Car',
  component: Car,
  default: true,
  sort: (order, a, b) => {
    const carA = a.carClasses.join('');
    const carB = b.carClasses.join('');
    if (carA === carB) {
      return defaultSort(order, a, b);
    }
    if (order === 'asc') {
      return (carA.toLowerCase() < carB.toLowerCase() ? -1 : 1);
    }
    return (carA.toLowerCase() > carB.toLowerCase() ? -1 : 1);
  },
}, {
  id: 'start',
  header: 'Start',
  component: StartDate,
  default: true,
  sort: getSortByDate('startTime'),
}, {
  id: 'end',
  header: 'End',
  component: EndDate,
  sort: (order, a, b) => {
    const timeA = moment(a.startTime).add(a.weekLength);
    const timeB = moment(b.startTime).add(b.weekLength);
    if (timeA.isSame(timeB)) {
      return defaultSort(order, a, b);
    }
    if (order === 'asc') {
      return timeA.isBefore(timeB) ? -1 : 1;
    }

    return timeA.isAfter(timeB) ? -1 : 1;
  },
}, {
  id: 'racelength',
  header: 'Length',
  component: RaceLength,
  default: true,
}, {
  id: 'official',
  header: 'Official',
  component: Official,
  default: true,
  sort: (order, a, b) => {
    if (a.official === b.official) {
      return defaultSort(order, a, b);
    }
    if (order === 'asc') {
      return (a.official === false ? -1 : 1);
    }
    return (a.official === true ? -1 : 1);
  },
}, {
  id: 'fixed',
  header: 'Fixed',
  component: Fixed,
  sort: (order, a, b) => {
    if (a.fixed === b.fixed) {
      return defaultSort(order, a, b);
    }
    if (order === 'asc') {
      return (a.fixed === false ? -1 : 1);
    }
    return (a.fixed === true ? -1 : 1);
  },
}, {
  id: 'raceTimes',
  header: 'Race times',
  component: RaceTimes,
}, {
  id: 'nextRace',
  header: 'Next race',
  component: NextRace,
  default: true,
  sort: (order, a, b) => {
    const now = moment().utc();
    const aNextDate = getNextRace(now, a);
    const bNextDate = getNextRace(now, b);
    if (aNextDate === null && bNextDate === null) {
      return defaultSort(order, a, b);
    }
    if (aNextDate === null) {
      return order === 'asc' ? 1 : -1;
    }
    if (bNextDate === null) {
      return order === 'asc' ? -1 : 1;
    }
    const sort = sortByDate(order, aNextDate, bNextDate);
    
    return sort !== 0 ? sort : defaultSort(order, a, b);
  },
}, {
  id: 'seriesEnd',
  header: 'Season end',
  component: SeasonEnd,
  default: false,
  sort: getSortByDate('seriesEnd'),
}, {
  id: 'seriesLink',
  header: 'Link',
  component: LinkColumn,
  default: true,
}];

export default availableColumns;
