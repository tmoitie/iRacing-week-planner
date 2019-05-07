import { duration } from 'moment';

export default [
  {
    // Indy Fixed
    seriesId: 165,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes'),
  },
  {
    // Street Stock C
    seriesId: 190,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  },
  {
    // Super Late Model
    seriesId: 223,
    everyTime: duration(2, 'hours'),
    offset: duration(75, 'minutes'),
  },
  {
    // Class C Trucks Open
    seriesId: 47,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes'),
  },
  {
    // Class C Trucks Fixed
    seriesId: 164,
    everyTime: duration(1, 'hours'),
    offset: duration(15, 'minutes'),
  },
  {
    // Tour Modified
    seriesId: 102,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // NIS Fixed
    seriesId: 207,
    offWeeks: [6.5, 12.5, 15.5, 24.5]
  },
  {
    // NIS Open
    seriesId: 229,
    offWeeks: [6.5, 12.5, 15.5, 24.5]
  },
  {
    // IndyCar iRacing series
    seriesId: 374,
    offWeeks: [1.1, 1.2, 1.3, 2.1, 5.1, 6.1, 6.2, 6.3, 8.1, 8.2, 10.1, 10.2, 10.3]
  }
];
