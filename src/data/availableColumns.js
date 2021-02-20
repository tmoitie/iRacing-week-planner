// @flow

import moment from 'moment';
import {
  Id, Car, Class, EndDate, Fixed, Licence, LinkColumn, NextRace, Official,
  RaceTimes, Series, SeasonEnd, StartDate, Track, Type,
} from '../components/columns';
import { getNextRace } from '../lib/races';

/* eslint react/no-multi-comp: 0 */

const defaultSort = (a, b) => {
  if (a.licenceClassNumber === b.licenceClassNumber) {
    return a.series.toLowerCase() < b.series.toLowerCase() ? -1 : 1;
  }
  return a.licenceClassNumber < b.licenceClassNumber ? -1 : 1;
};

const sortByDate = (order: string, a?: moment.Moment, b?: moment.Moment) => {
  if (a === b) {
    return 0;
  }
  if (a === null) {
    return 1;
  }
  if (b === null) {
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

const getSortByDate = (key) => (order, a, b) => {
  const sort = sortByDate(order, a[key], b[key]);
  return sort !== 0 ? sort : defaultSort(a, b);
};

export default [{
  id: 'id',
  header: 'ID',
  component: Id,
  default: false,
  sort: (order, a, b) => {
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
    if (a.licenceClassNumber === b.licenceClassNumber) {
      return a.series.toLowerCase() < b.series.toLowerCase() ? -1 : 1;
    }
    if (order === 'asc') {
      return (a.licenceClassNumber < b.licenceClassNumber ? -1 : 1);
    }
    return (a.licenceClassNumber > b.licenceClassNumber ? -1 : 1);
  },
}, {
  id: 'licence',
  header: 'Licence',
  component: Licence,
  default: true,
  sort: (order, a, b) => {
    if (a.licenceLevel === b.licenceLevel) {
      return a.series.toLowerCase() < b.series.toLowerCase() ? -1 : 1;
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
      return defaultSort(a, b);
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
      return a.series.toLowerCase() < b.series.toLowerCase() ? -1 : 1;
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
      return a.series.toLowerCase() < b.series.toLowerCase() ? -1 : 1;
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
    if (timeA === timeB) {
      return defaultSort(a, b);
    }
    if (order === 'asc') {
      return (timeA < timeB ? -1 : 1);
    }
    return (timeA > timeB ? -1 : 1);
  },
}, {
  id: 'official',
  header: 'Official',
  component: Official,
  default: true,
  sort: (order, a, b) => {
    if (a.official === b.official) {
      return defaultSort(a, b);
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
      return defaultSort(a, b);
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
    const sort = sortByDate(order, aNextDate, bNextDate);
    return sort !== 0 ? sort : defaultSort(a, b);
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
