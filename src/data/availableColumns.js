import {
  Car, Class, EndDate, Fixed, Licence, NextRace, Official, Series, StartDate, Track, Type
} from '../components/columns/';

/* eslint react/no-multi-comp: 0 */

export default [{
  id: 'class',
  header: 'Class',
  component: Class,
  default: true,
  sort: (a, b) => a.licenceLevel === b.licenceLevel ? 0 : (a.licenceLevel < b.licenceLevel ? -1 : 1)
}, {
  id: 'licence',
  header: 'Licence',
  component: Licence,
  default: true,
  sort: (a, b) => a.licenceLevel === b.licenceLevel ? 0 : (a.licenceLevel < b.licenceLevel ? -1 : 1)
}, {
  id: 'type',
  header: 'Type',
  component: Type,
  default: true,
  sort: (a, b) => a.type === b.type ? 0 : (a.type < b.type ? -1 : 1)
}, {
  id: 'series',
  header: 'Series',
  component: Series,
  default: true,
  forced: true,
  sort: (a, b) => a.series === b.series ? 0 : (a.series < b.series ? -1 : 1)
}, {
  id: 'track',
  header: 'Track',
  component: Track,
  default: true,
  sort: (a, b) => a.track === b.track ? 0 : (a.track < b.track ? -1 : 1)
}, {
  id: 'car',
  header: 'Car',
  component: Car,
  default: true,
  sort: (a, b) => {
    const carA = a.carClasses.join('');
    const carB = b.carClasses.join('');
    return carA === carB ? 0 : (carA < carB ? -1 : 1);
  }
}, {
  id: 'start',
  header: 'Start',
  component: StartDate,
  default: true,
  sort: (a, b) => a.startTime === b.startTime ? 0 : (a.startTime < b.startTime ? -1 : 1)
}, {
  id: 'end',
  header: 'End',
  component: EndDate,
  sort: (a, b) => {
    const timeA = a.startTime + a.weekLength;
    const timeB = b.startTime + b.weekLength;
    return timeA === timeB ? 0 : (timeA < timeB ? -1 : 1);
  }
}, {
  id: 'official',
  header: 'Official',
  component: Official,
  default: true,
  sort: (a, b) => a.official === b.official ? 0 : (a.official === false ? -1 : 1)
}, {
  id: 'fixed',
  header: 'Fixed',
  component: Fixed,
  sort: (a, b) => a.fixed === b.fixed ? 0 : (a.fixed === false ? -1 : 1)
}, {
  id: 'nextRace',
  header: 'Next Race',
  component: NextRace
  // sort: (a, b) => a.fixed === b.fixed ? 0 : (a.fixed === false ? -1 : 1)
}];
