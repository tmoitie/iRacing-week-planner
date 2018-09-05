import { duration } from 'moment';

export default [
  {
    // Dirt 360 Sprint Car
    seriesId: 305,
    everyTime: duration(2, 'hours'),
    offset: duration(90, 'minutes')
  },
  {
    // DIRTcar Class C Street Stock
    seriesId: 311,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes')
  },
  {
    // Dirt Pro Late Model
    seriesId: 306,
    everyTime: duration(2, 'hours'),
    offset: duration(30, 'minutes')
  },
  {
    // DIRTcar UMP Modified
    seriesId: 316,
    everyTime: duration(2, 'hours'),
    offset: duration(75, 'minutes')
  },
  {
    // DIRT Midget Cup
    seriesId: 327,
    everyTime: duration(2, 'hours'),
    offset: duration(75, 'minutes')
  },
  {
    // USAC 360 Sprint Car
    seriesId: 310,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes')
  },
  {
    // Rallycross World Champs
    seriesId: 348,
    setTimes: [
      duration({ days: 3, hours: 1 }), // Fri 1am
    ],
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [
      2.1, 2.2, 4.1, 6.1, 7.1, 8.1, 8.2, 10.1
    ]
  },
];
