import { duration } from 'moment';

export default [
  {
    // Sprint Cup Open
    seriesId: 58,
    everyTime: duration(2, 'hours'),
    offset: duration(30, 'minutes'),
  },
  {
    // Sprint Cup Fixed
    seriesId: 191,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes'),
  },
  {
    // NASCAR iRacing Pro Series
    seriesId: 95,
    setTimes: [
      duration({ days: 1, hours: 2 }), // Wed 2am
    ],
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [3.5, 5.2, 5.5]
  }
];
