import { duration } from 'moment';

export default [
  {
    // Blancpain Sprint
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
    // IMSA
    seriesId: 227,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes'),
  },
  {
    // Le Mans
    seriesId: 330,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  },
  {
    // Le Mans Enduro
    seriesId: 331,
    setTimes: [
      duration({ days: 4, hours: 7 }), // Sat 7am
      duration({ days: 4, hours: 19 }),  // Sat 7pm
      duration({ days: 5, hours: 14 })  // Sun 2pm
    ],
    offWeeks: [1.1, 2.1, 3.1, 4.1]
  },
  {
    // Formula Renault 3.5
    seriesId: 359,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes')
  },
];
