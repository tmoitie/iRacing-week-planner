import {Car, Class, EndDate, Fixed, Licence, Official, Series, StartDate, Track, Type} from '../components/columns/';

/* eslint react/no-multi-comp: 0 */

export default [{
  header: 'Class',
  component: Class,
  sort: (a, b) => a.licenceLevel === b.licenceLevel ? 0 : (a.licenceLevel < b.licenceLevel ? -1 : 1)
}, {
  header: 'Licence',
  component: Licence,
  sort: (a, b) => a.licenceLevel === b.licenceLevel ? 0 : (a.licenceLevel < b.licenceLevel ? -1 : 1)
}, {
  header: 'Type',
  component: Type,
  sort: (a, b) => a.type === b.type ? 0 : (a.type < b.type ? -1 : 1)
}, {
  header: 'Series',
  component: Series,
  sort: (a, b) => a.series === b.series ? 0 : (a.series < b.series ? -1 : 1)
}, {
  header: 'Track',
  component: Track,
  sort: (a, b) => a.track === b.track ? 0 : (a.track < b.track ? -1 : 1)
}, {
  header: 'Car',
  component: Car,
  sort: (a, b) => {
    const carA = a.carClasses.join('');
    const carB = b.carClasses.join('');
    return carA === carB ? 0 : (carA < carB ? -1 : 1);
  }
}, {
  header: 'Start',
  component: StartDate,
  sort: (a, b) => a.startTime === b.startTime ? 0 : (a.startTime < b.startTime ? -1 : 1)
}, {
  header: 'End',
  component: EndDate,
  sort: (a, b) => {
    const timeA = a.startTime + a.weekLength;
    const timeB = b.startTime + b.weekLength;
    return timeA === timeB ? 0 : (timeA < timeB ? -1 : 1);
  }
}, {
  header: 'Official',
  component: Official,
  sort: (a, b) => a.official === b.official ? 0 : (a.official === false ? -1 : 1)
}, {
  header: 'Fixed',
  component: Fixed,
  sort: (a, b) => a.fixed === b.fixed ? 0 : (a.fixed === false ? -1 : 1)
}];
