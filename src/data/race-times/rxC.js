import { duration } from 'moment';

export default [
  {
    // Lucas Oil Off Road Racing Pro 2 Series
    seriesId: 378,
    everyTime: duration(60, 'minutes'),
    offset: duration(30, 'minutes'),
  },
  {
    // iRX World Championship Series
    seriesId: 424,
    weekEndOffset: duration({ days: 7 }),
    setTimes: [
      duration({ days: 4, hours: 17, minutes: 45 }), // Sat 17:45 GMT
    ],
    offWeeks: [1.1, 8.1],
  },
];
