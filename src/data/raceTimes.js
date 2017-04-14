import { duration } from 'moment';
import dirtR from './race-times/dirtR.js';
import dirtD from './race-times/dirtD.js';
import dirtC from './race-times/dirtC.js';
import dirtB from './race-times/dirtB.js';

export default [
  ...dirtR,
  ...dirtD,
  ...dirtC,
  ...dirtB,
  {
    seriesId: 266,
    setTimes: [
      duration({ days: 4, hours: 13 }),  // Sat 1pm
    ]
  }, {
    // Advanced Legends
    seriesId: 32,
    everyTime: duration(1, 'hours'),
    offset: duration(30, 'minutes')
  }, {
    // Street Stock
    seriesId: 182,
    everyTime: duration(1, 'hours'),
    offset: duration(0, 'minutes')
  }, {
    // Late model
    seriesId: 33,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes')
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
    offset: duration(75, 'minutes'),
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
    // Production Car Challenge
    seriesId: 112,
    everyTime: duration(1, 'hours'),
    offset: duration(30, 'minutes'),
  }, {
    // Global Challenge
    seriesId: 210,
    everyTime: duration(2, 'hours'),
    offset: duration(90, 'minutes'),
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
    offset: duration(15, 'minutes')
  }, {
    // Blancpain Endurance
    seriesId: 237,
    setTimes: [
      duration({ days: 4, hours: 9 }), // Sat 9am
      duration({ days: 4, hours: 19 }),  // Sat 7pm
      duration({ days: 5, hours: 17 })  // Sun 5pm
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
    // Carb Cup
    seriesId: 116,
    everyTime: duration(1, 'hours'),
    offset: duration(45, 'minutes'),
  }, {
    // Dallara Dash
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
      duration({ days: 1, hours: 21 }), // Wed 9pm
      duration({ days: 3, hours: 1 }),  // Fri 1am
      duration({ days: 4, hours: 10 }), // Sat 10am
      duration({ days: 4, hours: 16 }), // Sat 4pm
      duration({ days: 6, hours: 1 }),  // Mon 1am
    ],
    offWeeks: [
      7.5, 11.5, 24.5
    ]
  }, {
    // NIS Open
    seriesId: 229,
    setTimes: [
      duration({ days: 2, hours: 1 }),  // Thu 1am
      duration({ days: 2, hours: 19 }), // Thu 7pm
      duration({ days: 4, hours: 1 }),  // Sat 1am
      duration({ days: 5, hours: 14 }), // Sun 2pm
    ],
    offWeeks: [
      7.5, 11.5, 24.5
    ]
  }, {
    // Road WC
    seriesId: 206,
    setTimes: [
      duration({ days: 4, hours: 14 }), // Sat 2pm
    ],
    weekStartOffset: duration({ days: 9 }),
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [1.5, 2.5, 3.1, 3.6, 4.3, 4.7, 5.2, 5.4, 5.6, 5.8, 6.2, 6.4, 7.3, 7.6, 7.7, 8.5, 9.5, 10.3, 10.8, 11.5]
  }, {
    // Road Pro Series
    seriesId: 67,
    setTimes: [
      duration({ days: 4, hours: 14 }), // Sat 2pm
    ],
    offWeeks: [4.5, 5.2, 5.5]
  }, {
    // Peak Antifreeze
    seriesId: 205,
    setTimes: [
      duration({ days: 1, hours: 0, minutes: 45 }), // Sun 0:45am
    ],
    weekStartOffset: duration({ days: 28 }),
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [3.5, 4.5, 5.5, 6.5, 7.2, 7.3, 8.5, 9.3, 9.6, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5]
  }, {
    // NASCAR iRacing Pro Series
    seriesId: 95,
    setTimes: [
      duration({ days: 1, hours: 2 }), // Wed 2am
    ],
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [3.5, 5.2, 5.5]
  }, {
    // 12 hours of Sebring
    seriesId: 271,
    setTimes: [
      duration({ days: 4, hours: 2 }),  // Sat 2am
      duration({ days: 4, hours: 13 }),  // Sat 1pm
      duration({ days: 4, hours: 17 }),  // Sat 5pm
      duration({ days: 5, hours: 14 }), // Sun 2am
    ]
  }, {
    // W13 SRF
    seriesId: 69,
    everyTime: duration(30, 'minutes'),
    offset: duration(0, 'minutes'),
  }, {
    // W13 SS
    seriesId: 134,
    everyTime: duration(30, 'minutes'),
    offset: duration(0, 'minutes'),
  }, {
    // MX-5 Shakedown
    seriesId: 273,
    everyTime: duration(30, 'minutes'),
    offset: duration(15, 'minutes')
  }, {
    // Formula Renault
    seriesId: 272,
    everyTime: duration(30, 'minutes'),
    offset: duration(15, 'minutes')
  }, {
    // European MX-5
    seriesId: 270,
    everyTime: duration(2, 'hours'),
    offset: duration(30, 'minutes')
  }, {
    // VRS Mazda (Fixed)
    seriesId: 274,
    everyTime: duration(1, 'hours'),
    offset: duration(0, 'minutes')
  }, {
    // Formula Renault 2.0
    seriesId: 269,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes')
  }, {
    // IndyCar Road - no time data yet
    seriesId: 133,
    everyTime: duration(2, 'hours')
  }, {
    // IndyCar Oval - no time data yet
    seriesId: 132,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes')
  }, {
    // Indy 500
    seriesId: 276,
    setTimes: [
      duration({ days: 4, hours: 1, minutes: 0 }),
      duration({ days: 4, hours: 20, minutes: 0 }),
      duration({ days: 5, hours: 1, minutes: 0 }),
      duration({ days: 5, hours: 12, minutes: 0 })
    ]
  }, {
    // VLN Endurance
    seriesId: 275,
    offWeeks: [
      1.5, 2.1, 2.15, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8,
      2.9, 3.1, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 6.1, 6.2, 7.1, 8.1
    ],
    setTimes: [
      duration({ days: 4, hours: 14, minutes: 0 }), // Sat 2pm
      duration({ days: 5, hours: 3, minutes: 0 }), // Sun 3am
    ]
  }, {
    // 13th Fig Gr8
    seriesId: 245,
    everyTime: duration(30, 'minutes'),
    offset: duration(0, 'minutes')
  }, {
    // 13th Identity Crisis
    seriesId: 244,
    everyTime: duration(30, 'minutes'),
    offset: duration(0, 'minutes')
  }, {
    // 13th Tube Frame Twister
    seriesId: 242,
    everyTime: duration(30, 'minutes'),
    offset: duration(15, 'minutes')
  }, {
    // Global Mazda
    seriesId: 139,
    everyTime: duration(60, 'minutes'),
    offset: duration(0, 'minutes')
  }, {
    // RUF GT3
    seriesId: 277,
    everyTime: duration(120, 'minutes'),
    offset: duration(60, 'minutes')
  }, {
    // Leo Bodnar ProtoGT
    seriesId: 278,
    everyTime: duration(120, 'minutes'),
    offset: duration(105, 'minutes')
  }, {
    // Radical
    seriesId: 74,
    everyTime: duration(120, 'minutes'),
    offset: duration(60, 'minutes')
  }, {
    // Blancpain GT
    seriesId: 268,
    setTimes: [
      duration({ days: 4, hours: 13, minutes: 30 }), // Sat 1:30pm
    ],
    weekStartOffset: duration({ days: 2 }),
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [1.5, 3.1, 3.2, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6]
  }, {
    seriesId: 280,
    setTimes: [
      duration({ days: 4, hours: 2, minutes: 0 }),
      duration({ days: 4, hours: 13, minutes: 0 }),
      duration({ days: 4, hours: 17, minutes: 0 }),
      duration({ days: 5, hours: 14, minutes: 0 })
    ],
  }, {
    // #Parkedit
    seriesId: 282,
    everyTime: duration(30, 'minutes'),
    offset: duration(0, 'minutes')
  }, {
    // Gymkana
    seriesId: 135,
    everyTime: duration(30, 'minutes'),
    offset: duration(0, 'minutes')
  }, {
    // Gymkana
    seriesId: 283,
    everyTime: duration(30, 'minutes'),
    offset: duration(15, 'minutes')
  }, {
    // Kamel GT
    seriesId: 285,
    everyTime: duration(2, 'hours'),
    offset: duration(1, 'hours')
  }, {
    // Petit le mans
    seriesId: 286,
    setTimes: [
      duration({ days: 5, hours: 14, minutes: 0 })
    ],
  }, {
    // Roar before the 24
    seriesId: 297,
    setTimes: [
      duration({ days: 4, hours: 2, minutes: 0 }),
      duration({ days: 4, hours: 13, minutes: 0 }),
      duration({ days: 4, hours: 17, minutes: 0 }),
      duration({ days: 5, hours: 14, minutes: 0 })
    ],
    weekEndOffset: duration({ days: -7 }),
  }, {
    // 24 du fun
    seriesId: 54,
    everyTime: duration(30, 'minutes'),
    offset: duration(0, 'minutes'),
    weekEndOffset: duration({ days: 1 }),
  }, {
    // Porsche cup
    seriesId: 299,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes')
  }
];
