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
    // Super Late Model Fixed
    seriesId: 416,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes'),
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
    // Tour Modified Fixed
    seriesId: 417,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  },
  {
    // NIS Fixed
    seriesId: 207,
    offWeeks: [8.1, 12.1, 21.1, 21.1],
    setTimes: [
      duration({ days: 1, hours: 21, minutes: 0 }), // Wed, 21:00 GMT
      duration({ days: 3, hours: 1, minutes: 0 }), // Fri, 01:00 GMT
      duration({ days: 4, hours: 10, minutes: 0 }), // Sat, 10:00 GMT
      duration({ days: 4, hours: 16, minutes: 0 }), // Sat, 16:00 GMT
      duration({ days: 6, hours: 1, minutes: 0 }), // Mon, 01:00 GMT
    ],
  },
  {
    // NIS Open
    seriesId: 229,
    offWeeks: [8.1, 12.1, 21.1, 21.1],
    setTimes: [
      duration({ days: 2, hours: 1, minutes: 0 }), // Thu, 01:00 GMT
      duration({ days: 2, hours: 19, minutes: 0 }), // Thu, 19:00 GMT
      duration({ days: 4, hours: 1, minutes: 0 }), // Sat, 01:00 GMT
      duration({ days: 5, hours: 14, minutes: 0 }), // Sun, 14:00 GMT
    ],
  },
  {
    // Old School NASCAR
    seriesId: 413,
    everyTime: duration(1, 'hours'),
    offset: duration(45, 'minutes'),
  },
];
