import {
  Car, Class, EndDate, Fixed, Licence, NextRace, Official, RaceTimes, Series, StartDate, Track, Type
} from '../components/columns/';
import moment from 'moment';

/* eslint react/no-multi-comp: 0 */

const defaultSort = (a, b) => {
  if (a.licenceClassNumber === b.licenceClassNumber) {
    return a.series.toLowerCase() < b.series.toLowerCase() ? -1 : 1;
  }
  return a.licenceClassNumber < b.licenceClassNumber ? -1 : 1;
};

export default [{
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
}, {
  id: 'start',
  header: 'Start',
  component: StartDate,
  default: true,
  sort: (order, a, b) => {
    if (a.startTime === b.startTime) {
      return defaultSort(a, b);
    }
    if (order === 'asc') {
      return (a.startTime < b.startTime ? -1 : 1);
    }
    return (a.startTime > b.startTime ? -1 : 1);
  }
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
  }
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
  }
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
  }
}, {
  id: 'raceTimes',
  header: 'Race Times',
  component: RaceTimes
}, {
  id: 'nextRace',
  header: 'Next Race',
  component: NextRace,
  default: true,
  sort: (order, a, b) => {
    if (a.nextTime.isSame(b.nextTime)) {
      return defaultSort(a, b);
    }
    if (order === 'asc') {
      return a.nextTime.isBefore(b.nextTime) ? -1 : 1;
    }
    return a.nextTime.isAfter(b.nextTime) ? -1 : 1;
  }
}];
