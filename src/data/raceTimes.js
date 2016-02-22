import {duration} from 'moment';

export default [{
  seriesId: 266,
  setTimes: [
    duration({days: 4, hours: 13}),  // Sat 1pm
  ]
}, {
  // Advanced Legends
  seriesId: 32,
  everyTime: duration(1, 'hours'),
  offset: duration(30, 'minutes'),
  lengths: ['40L', '40L', '40L', '40L', '30L', '40L', '40L', '40L', '40L', '40L', '30L', '40L']
}, {
  // Street Stock
  seriesId: 182,
  everyTime: duration(1, 'hours'),
  offset: duration(45, 'minutes'),
  lengths: ['20L', '40L', '20L', '40L', '20L', '40L', '20L', '40L', '20L', '40L', '20L', '40L']
}, {
  // Late model
  seriesId: 33,
  everyTime: duration(2, 'hours'),
  offset: duration(15, 'minutes'),
  lengths: ['50L', '60L', '40L', '40L', '50L', '40L', '50L', '60L', '50L', '40L', '60L', '50L']
}, {
  // National
  seriesId: 167,
  everyTime: duration(2, 'hours'),
  offset: duration(105, 'minutes'),
}, {
  // SK Modified
  seriesId: 45,
  everyTime: duration(2, 'hours'),
  offset: duration(60, 'minutes'),
}, {
  // Indy Fixed
  seriesId: 165,
  everyTime: duration(2, 'hours'),
  offset: duration(15, 'minutes'),
}, {
  // Street Stock C
  seriesId: 190,
  everyTime: duration(2, 'hours'),
  offset: duration(60, 'minutes'),
}, {
  // Super Late Model
  seriesId: 223,
  everyTime: duration(2, 'hours'),
  offset: duration(15, 'minutes'),
}, {
  // Class C Trucks Open
  seriesId: 47,
  everyTime: duration(2, 'hours'),
  offset: duration(45, 'minutes'),
}, {
  // Class C Trucks Fixed
  seriesId: 164,
  everyTime: duration(1, 'hours'),
  offset: duration(15, 'minutes'),
}, {
  // Tour Modified
  seriesId: 102,
  everyTime: duration(2, 'hours'),
  offset: duration(0, 'minutes'),
}, {
  // Silver Crown
  seriesId: 53,
  everyTime: duration(2, 'hours'),
  offset: duration(105, 'minutes'),
}, {
  // Sprint Car
  seriesId: 131,
  everyTime: duration(2, 'hours'),
  offset: duration(60, 'minutes'),
}, {
  // Xfinity Open
  seriesId: 62,
  everyTime: duration(2, 'hours'),
  offset: duration(0, 'minutes'),
  offWeeks: [5.3, 5.6, 9.5, 10.5, 14.5, 30.3, 30.6]
}, {
  // Xfinity Fixed
  seriesId: 103,
  everyTime: duration(2, 'hours'),
  offset: duration(60, 'minutes'),
}, {
  // Sprint Cup Open
  seriesId: 58,
  everyTime: duration(2, 'hours'),
  offset: duration(30, 'minutes'),
}, {
  // Sprint Cup Fixed
  seriesId: 191,
  everyTime: duration(2, 'hours'),
  offset: duration(45, 'minutes'),
}, {
  // Pro Series
  seriesId: 95 // 1am Wed
}, {
  // Production Car Challenge
  seriesId: 112,
  everyTime: duration(1, 'hours'),
  offset: duration(30, 'minutes'),
}, {
  // Mazda Cup
  seriesId: 139,
  everyTime: duration(1, 'hours'),
  offset: duration(0, 'minutes'),
}, {
  // iRacing Nordschleife Hotlap
  seriesId: 263,
  everyTime: duration(10, 'minutes'),
  offset: duration(0, 'minutes'),
}, {
  // Cadillac Cup
  seriesId: 183,
  everyTime: duration(2, 'hours'),
  offset: duration(90, 'minutes'),
}, {
  // GT Cup
  seriesId: 130,
  everyTime: duration(2, 'hours'),
  offset: duration(75, 'minutes'),
}, {
  // SRF
  seriesId: 63,
  everyTime: duration(2, 'hours'),
  offset: duration(45, 'minutes'),
}, {
  // Kia Cup
  seriesId: 248,
  everyTime: duration(2, 'hours'),
  offset: duration(45, 'minutes'),
}, {
  // Skippy
  seriesId: 34,
  everyTime: duration(1, 'hours'),
  offset: duration(15, 'minutes'),
}, {
  // Advanced Mazda
  seriesId: 231,
  everyTime: duration(2, 'hours'),
  offset: duration(15, 'minutes'),
  lengths: ['25m', '25m', '25m', '25m', '45m', '25m', '25m', '25m', '25m', '25m', '25m', '45m']
}, {
  // Blancpain Endurance
  seriesId: 237,
  setTimes: [
    duration({days: 4, hours: 9}),  // Sat 9am
    duration({days: 4, hours: 19}), // Sat 7pm
    duration({days: 5, hours: 17})  // Sun 5pm
  ]
}, {
  // Lotus 49
  seriesId: 201,
  everyTime: duration(2, 'hours'),
  offset: duration(90, 'minutes'),
}, {
  // GT1
  seriesId: 233,
  everyTime: duration(2, 'hours'),
  offset: duration(60, 'minutes'),
}, {
  // IndyCar Winter
  seriesId: 249,
  setTimes: [
    duration(1, 'hours'),          // Tue 1am
    duration({ days: 2, hours: 20}), // Thur 8pm
    duration({ days: 3, hours: 3}),  // Fri 3am
    duration({ days: 3, hours: 19}), // Fri 7pm
    duration({ days: 3, hours: 22}), // Fri 10pm
    duration({ days: 4, hours: 2}),  // Sat 2am
    duration({ days: 4, hours: 10}), // Sat 10am
    duration({ days: 4, hours: 15}), // Sat 3pm
    duration({ days: 4, hours: 18}), // Sat 6pm
    duration({ days: 4, hours: 22}), // Sat 10pm
    duration({ days: 5, hours: 15}), // Sun 3pm
    duration({ days: 5, hours: 18}), // Sun 6pm
  ]
}, {
  // Prototype
  seriesId: 256,
  everyTime: duration(2, 'hours'),
  offset: duration(105, 'minutes'),
}, {
  // V8 Supercar
  seriesId: 88,
  everyTime: duration(2, 'hours'),
  offset: duration(15, 'minutes'),
}, {
  // RUF
  seriesId: 224,
  everyTime: duration(2, 'hours'),
  offset: duration(105, 'minutes'),
}, {
  // Star Mazda
  seriesId: 44,
  everyTime: duration(2, 'hours'),
  offset: duration(105, 'minutes'),
}, {
  // Blancpain Sprint
  seriesId: 228,
  everyTime: duration(2, 'hours'),
  offset: duration(0, 'minutes'),
}, {
  // Lotus 79
  seriesId: 65,
  everyTime: duration(2, 'hours'),
  offset: duration(30, 'minutes'),
}, {
  // IMSA
  seriesId: 227,
  everyTime: duration(2, 'hours'),
  offset: duration(45, 'minutes'),
}, {
  // Grand Prix
  seriesId: 260,
  everyTime: duration(2, 'hours'),
  offset: duration(0, 'minutes'),
}, {
  // Grand Prix Pro
  seriesId: 67 // 4pm Sat
}, {
  // Carb Cup
  seriesId: 116,
  everyTime: duration(1, 'hours'),
  offset: duration(45, 'minutes'),
}, {
  // Dallera Dash
  seriesId: 258,
  everyTime: duration(1, 'hours'),
  offset: duration(0, 'minutes'),
}, {
  // Pickup Cup
  seriesId: 259,
  everyTime: duration(1, 'hours'),
  offset: duration(30, 'minutes'),
}, {
  // Nurbergring Fun
  seriesId: 267,
  everyTime: duration(1, 'hours'),
  offset: duration(30, 'minutes'),
}, {
  // NIS Fixed
  seriesId: 207,
  setTimes: [
    duration({days: 3, hours: 2}),  // Fri 2am
    duration({days: 4, hours: 10}), // Sat 10am
    duration({days: 4, hours: 17}), // Sat 5pm
    duration({days: 6, hours: 2}),  // Mon 2am
  ],
  offWeeks: [
    5.5, 12.5, 15.5, 22.5
  ]
}, {
  // NIS Open
  seriesId: 229,
  setTimes: [
    duration({days: 2, hours: 2}),  // Thu 2am
    duration({days: 4, hours: 2}),  // Sat 2am
    duration({days: 5, hours: 15}), // Sun 3pm
  ],
  offWeeks: [
    5.5, 12.5, 15.5, 22.5
  ]
}, {
  // Road WC
  seriesId: 206,
  setTimes: [
    duration({days: 4, hours: 14}), // Sat 2pm
  ],
  weekStartOffset: duration({days: 9}),
  weekEndOffset: duration({days: 2}),
  hideAfter: true,
  offWeeks: [2.5, 3.5, 4.5, 5.5, 6.5, 7.3, 7.6, 8.5, 9.3, 9.6, 10.5, 11.5, 12.5, 13.5, 14.3, 14.6, 15.5]
}, {
  // Peak Antifreeze
  seriesId: 205,
  setTimes: [
    duration({days: 1, hours: 1, minutes: 45}), // Sun 0:45am
  ],
  weekStartOffset: duration({days: 14}),
  weekEndOffset: duration({days: 5}),
  hideAfter: true,
  offWeeks: [2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.2, 8.4, 8.6, 8.8, 9.5, 10.5, 11.5, 12.5, 13.3, 13.6, 14.5, 15.5]
}];
