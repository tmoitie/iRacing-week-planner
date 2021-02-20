import { duration } from 'moment';

export default [
  {
    // Advanced Mazda
    seriesId: 231,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes'),
  },
  {
    // Blancpain Endurance
    seriesId: 237,
    setTimes: [
      duration({ days: 4, hours: 9 }), // Sat 9am
      duration({ days: 4, hours: 19 }), // Sat 7pm
      duration({ days: 5, hours: 17 }), // Sun 5pm
    ],
    // weekStartOffset: duration({ days: 0 }),
    // weekEndOffset: duration({ days: 7 }),
    offWeeks: [],
  },
  {
    // Lotus 49
    seriesId: 201,
    everyTime: duration(2, 'hours'),
    offset: duration(90, 'minutes'),
  },
  {
    // V8 Supercar
    seriesId: 399,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes'),
  },
  {
    // V8 Supercar Aussie
    seriesId: 405,
    everyTime: duration(2, 'hours'),
    offset: duration(15, 'minutes'),
  },
  {
    // Kamel GT
    seriesId: 285,
    everyTime: duration(2, 'hours'),
    offset: duration(1, 'hours'),
  },
  {
    // Porsche cup
    seriesId: 299,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes'),
  },
  // {
  //   // Star Mazda
  //   seriesId: 44,
  //   // everyTime: duration(2, 'hours'),
  //   // offset: duration(105, 'minutes'),
  // },
  {
    // Fanatec GT
    seriesId: 278,
    everyTime: duration(120, 'minutes'),
    offset: duration(105, 'minutes'),
  },
  {
    // Radical
    seriesId: 74,
    everyTime: duration(120, 'minutes'),
    offset: duration(60, 'minutes'),
  },
  // {
  //   // ROAR
  //   seriesId: 297,
  //   // setTimes: [
  //   //   duration({ days: 5, hours: 2 }), // Sun 2am
  //   //   duration({ days: 5, hours: 13 }), // Sun 1pm
  //   //   duration({ days: 5, hours: 17 }), // Sun 5pm
  //   //   duration({ days: 6, hours: 14 }) // Mon 2pm
  //   // ]
  // },
  {
    // Dallara F3
    seriesId: 358,
    everyTime: duration(120, 'minutes'),
    offset: duration(75, 'minutes'),
  },
  {
    // IndyCar iRacing Series
    seriesId: 374,
    offWeeks: [1.1, 2.1, 5.1, 7.1, 9.1, 9.2, 10.1, 13.1, 14.1],
    setTimes: [
      duration({ days: 2, hours: 1 }), // Thu 01:00 GMT
      duration({ days: 3, hours: 20 }), // Fri 20:00 GMT
      duration({ days: 4, hours: 13 }), // Sat 13:00 GMT
      duration({ days: 4, hours: 18 }), // Sat 18:00 GMT
      duration({ days: 5, hours: 18 }), // Sun 18:00 GMT
      duration({ days: 6, hours: 1 }), // Mon 01:00 GMT
    ],
  },
  {
    // iRacing Endurance Series
    seriesId: 408,
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [
      1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 2.1, 2.1, 2.1, 2.1, 2.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1,
    ],
    setTimes: [
      duration({ days: 4, hours: 1 }), // Sat 01:00 GMT
      duration({ days: 4, hours: 13 }), // Sat 13:00 GMT
    ],
  },
  {
    // Porsche Esports Sprint Challenge
    seriesId: 410,
    weekEndOffset: duration({ days: 7 }),
    offWeeks: [
      2.1, 3.1, 3.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 9.1, 9.1, 10.1,
    ],
    everyTime: duration(120, 'minutes'),
    offset: duration(60, 'minutes'),
  },
  // {
  //   // Bathurst 1000 AU
  //   seriesId: 423,
  //   weekEndOffset: duration({ days: 7 }),
  //   setTimes: [
  //     duration({ days: 4, hours: 1 }), // Sat 01:00 GMT
  //   ]
  // },
  // {
  //   // Bathurst 1000 US
  //   seriesId: 422,
  //   weekEndOffset: duration({ days: 7 }),
  //   setTimes: [
  //     duration({ days: 4, hours: 13 }), // Sat 13:00 GMT
  //   ]
  // },
  {
    // IMSA Triple Crown
    seriesId: 425,
    setTimes: [
      duration({ days: 5, hours: 18 }), // Sun 18:00 GMT
    ],
    offWeeks: [1.1, 2.1],
  },
  {
    // IMSA Michelin Pilot
    seriesId: 386,
    everyTime: duration(120, 'minutes'),
    offset: duration(15, 'minutes'),
  },
  {
    // IMSA
    seriesId: 227,
    everyTime: duration(2, 'hours'),
    offset: duration(45, 'minutes'),
  },
  {
    // Pro 2000
    seriesId: 414,
    everyTime: duration(2, 'hours'),
    offset: duration(0, 'minutes'),
  },

  {
    // Apex F3
    seriesId: 431,
    everyTime: duration(2, 'hours'),
    offset: duration(75, 'minutes'),
  },
  {
    // Formula iR
    seriesId: 429,
    everyTime: duration(2, 'hours'),
    offset: duration(60, 'minutes'),
  },
  {
    // GT Challenge
    seriesId: 432,
    everyTime: duration(2, 'hours'),
    offset: duration(105, 'minutes'),
  },
];
