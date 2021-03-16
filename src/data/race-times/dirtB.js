import { duration } from 'moment';

export default [
  {
    // AMSoil Sprint
    seriesId: 309,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes'),
  },
  {
    // DIRTcar UMP Modified
    seriesId: 442,
    everyTime: duration(2, 'hours'),
    offset: duration(75, 'minutes'),
  },
  {
    // WoO Late Model
    seriesId: 308,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes'),
  },
  {
    // WoO Sprint Car
    seriesId: 307,
    everyTime: duration(2, 'hours'),
    offset: duration(30, 'minutes'),
  },
];
