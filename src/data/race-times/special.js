import { duration } from 'moment';

export default [
  {
    // Bathurst 12
    seriesId: 329,
    setTimes: [
      duration({ days: 3, hours: 22 }),
      duration({ days: 4, hours: 7 }),
      duration({ days: 4, hours: 12 }),
      duration({ days: 4, hours: 16 }),
    ],
    weekEndOffset: duration({ days: 4 }),
  },
]
