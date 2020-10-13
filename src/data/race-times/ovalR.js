import { duration } from 'moment';

export default [
  {
    // Carb Cup
    seriesId: 116,
    everyTime: duration(1, 'hours'),
    offset: duration(45, 'minutes'),
  },
  {
    // Dallara Dash
    seriesId: 258,
    everyTime: duration(1, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // Street Stock
    seriesId: 182,
    everyTime: duration(1, 'hours'),
    offset: duration(0, 'minutes'),
  },
  {
    // Pickup Cup
    seriesId: 259,
    everyTime: duration(1, 'hours'),
    offset: duration(30, 'minutes'),
  },
  {
    // Advanced Legends
    seriesId: 32,
    everyTime: duration(1, 'hours'),
    offset: duration(30, 'minutes'),
  },
  // {
  //   // Advanced Legends
  //   seriesId: 347,
  //   weekEndOffset: duration({ days: 7 }),
  // },
];
