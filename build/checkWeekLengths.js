/* eslint-disable no-console */

import races from '../src/lib/races';

const validWeekLengths = [1, 7];
const invalidRaces = races.filter((race) => !validWeekLengths.includes(race.weekLength.asDays()));

if (invalidRaces.length > 0) {
  console.error('Invalid calculated week lengths:');
  invalidRaces.forEach((race) => {
    console.error(
      `${race.series} (series ${race.seriesId}, season ${race.seasonId}, week ${race.week}): ${race.weekLength.asDays()} days`,
    );
  });
  process.exitCode = 1;
}
