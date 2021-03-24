import { duration } from 'moment';

export default [
  {
    // VRS Sprint
    seriesId: 228,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // Lotus 79
    seriesId: 65,
    everyTime: duration(2, 'hours'),
    offset: duration(30, 'minutes'),
  },
  {
    // Le Mans
    seriesId: 330,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  },
  {
    // Formula Renault 3.5
    seriesId: 359,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // GTE Endurance
    seriesId: 419,
    offWeeks: [1.1, 2.1, 3.1, 4.1, 5.1],
    setTimes: [
      duration({ days: 4, hours: 7 }), // Sat 7am
      duration({ days: 4, hours: 18 }), // Sat 6pm
      duration({ days: 5, hours: 14 }), // Sun 2pm
    ],
  },
  {
    // IndyCar Road
    seriesId: 133,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // GT3 Challenge
    seriesId: 444,
    everyTime: duration(2, 'hours'),
    offset: duration(75, 'minutes'),
  },
  {
    // Hagerty
    seriesId: 447,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes'),
  },
];
