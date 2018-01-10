import { duration } from 'moment';

export default [
  {
    // Advanced Mazda
    seriesId: 231,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes')
  },
  {
    // Blancpain Endurance
    seriesId: 237,
    setTimes: [
      duration({ days: 4, hours: 9 }), // Sat 9am
      duration({ days: 4, hours: 19 }),  // Sat 7pm
      duration({ days: 5, hours: 17 })  // Sun 5pm
    ],
    weekStartOffset: duration({ days: 0 }),
    weekEndOffset: duration({ days: 0 }),
    offWeeks: [2.5, 3.5, 4.2, 4.7, 5.5]
  },
  {
    // Lotus 49
    seriesId: 201,
    everyTime: duration(2, 'hours'),
    offset: duration(90, 'minutes'),
  },
  {
    // IndyCar Road
    seriesId: 133,
    everyTime: duration(2, 'hours')
  },
  {
    // Formula Renault 2.0
    seriesId: 269,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes')
  },
  {
    // V8 Supercar
    seriesId: 88,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes'),
  },
  {
    // Kamel GT
    seriesId: 285,
    everyTime: duration(2, 'hours'),
    offset: duration(1, 'hours')
  },
  {
    // Porsche cup
    seriesId: 299,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes')
  },
  {
    // Star Mazda
    seriesId: 44,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes'),
  },
  {
    // Leo Bodnar ProtoGT
    seriesId: 278,
    everyTime: duration(120, 'minutes'),
    offset: duration(105, 'minutes')
  },
  {
    // Radical
    seriesId: 74,
    everyTime: duration(120, 'minutes'),
    offset: duration(60, 'minutes')
  },
  {
    // ROAR
    seriesId: 297,
    setTimes: [
      duration({ days: 5, hours: 2 }), // Sun 2am
      duration({ days: 5, hours: 13 }), // Sun 1pm
      duration({ days: 5, hours: 17 }), // Sun 5pm
      duration({ days: 6, hours: 14 }) // Mon 2pm
    ]
  }
];
