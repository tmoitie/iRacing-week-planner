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
    // World of Outlaws Late Model Series - Fixed
    seriesId: 369,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes')
  },
];
