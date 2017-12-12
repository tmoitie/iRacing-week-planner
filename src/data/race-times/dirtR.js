import { duration } from 'moment';

export default [
  {
    // Dirt Street Stock
    seriesId: 290,
    everyTime: duration(1, 'hours'),
    offset: duration(30, 'minutes')
  },
  {
    // Fun Dirt Late Models
    seriesId: 304,
    everyTime: duration(1, 'hours'),
    offset: duration(30, 'minutes')
  },
  {
    // Fun Dirt Sprint Cars
    seriesId: 303,
    everyTime: duration(1, 'hours'),
    offset: duration(0, 'minutes')
  },
  {
    // iRacing Dirt Legends Cup
    seriesId: 315,
    everyTime: duration(30, 'minutes'),
    offset: duration(15, 'minutes')
  },
];
