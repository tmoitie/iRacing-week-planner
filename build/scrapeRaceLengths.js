/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import uniqBy from 'lodash.uniqby';

import races from '../src/lib/races';
import login from './helpers/login';
import sleep from './helpers/sleep';

const writeFile = Promise.promisify(fs.writeFile);

const seriesIds = process.argv.slice(2).map((id) => parseInt(id, 10));

let seriess = uniqBy(races, (race) => race.seriesId);

if (seriesIds.length > 0) {
  seriess = seriess.filter((series) => seriesIds.includes(series.seriesId));
}

const username = process.env.IWP_USERNAME || 'test';
const password = process.env.IWP_PASSWORD || 'test';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await login(page, username, password);

  const seriesRaceLengths = {};

  for await (const series of seriess) {
    await sleep(50);
    console.log(series.seasonId);
    // eslint-disable-next-line max-len
    const url = `https://members.iracing.com/membersite/member/SeriesSchedule.do?season=${series.seasonId}`;
    await page.goto(url);

    const table = await page.$('#series_schedule_list_table');
    const rows = await table.$$('tr');
    const weeks = await Promise.all(rows.map(async (row) => {
      const cells = await row.$$('td');
      if (cells.length !== 4) {
        return null;
      }

      const weekNumber = await page.evaluate((el) => el.innerText, cells[0]);
      // const startDate = await page.evaluate((el) => el.innerText, cells[1]);
      const options = await page.evaluate((el) => el.innerText, cells[2]);
      const optionsSplit = options.split('\n');

      const raceLengthLine = optionsSplit.find((line) => line.startsWith('Race length'));

      const findRaceLength = /((?<laps>[0-9]+) laps|(?<minutes>[0-9]+) mins)/;

      const raceLengthMatches = raceLengthLine ? raceLengthLine.match(findRaceLength) : null;

      return {
        raceweek: Number.parseInt(weekNumber, 10) - 1,
        laps: raceLengthMatches ? raceLengthMatches.groups.laps : undefined,
        minutes: raceLengthMatches ? raceLengthMatches.groups.minutes : undefined,
      };
    }));

    const weeksFiltered = weeks.filter((week) => week !== null);

    const mapOfWeeks = weeksFiltered.reduce(
      (output, week) => ({
        ...output,
        [week.raceweek]: {
          laps: week.laps,
          minutes: week.minutes,
        },
      }),
      {},
    );

    seriesRaceLengths[series.seasonId] = mapOfWeeks;

    await writeFile(
      path.join(__dirname, '../src/data/racelengths.json'),
      JSON.stringify(seriesRaceLengths, null, 2),
    );
  }

  await browser.close();
})();
