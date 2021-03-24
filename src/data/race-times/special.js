import { duration } from 'moment';

export default [
  {
    // BMW Sim GT Cup
    seriesId: 437,
    setTimes: [
      duration({ days: 5, hours: 13 }),
    ],
    weekEndOffset: duration({ days: 4 }),
  },
  {
    // 12 H Sebring
    seriesId: 271,
    setTimes: [
      duration({ days: 3, hours: 22 }),
      duration({ days: 4, hours: 7 }),
      duration({ days: 4, hours: 12 }),
      duration({ days: 4, hours: 16 }),
    ],
    weekEndOffset: duration({ days: 7 }),
  },
];
