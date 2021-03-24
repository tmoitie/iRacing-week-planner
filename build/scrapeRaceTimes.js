/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import uniqBy from 'lodash.uniqby';
import range from 'lodash.range';
import flatten from 'lodash.flatten';
import moment from 'moment';
import axios from 'axios';

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

  const cookie = await login(page, username, password);

  await browser.close();

  const seriesTimes = [];

  for await (const series of seriess) {
    const seriesStart = moment(series.seriesStart);
    const seriesEnd = moment(series.seriesEnd);
    const numberFourHourSlots = seriesEnd.diff(seriesStart, 'days') * 6;

    const fourHourSlots = range(0, numberFourHourSlots);

    try {
      const times = [];
      for await (const fourHourSlotNumber of fourHourSlots) {
        console.log(fourHourSlotNumber);
        const startTime = moment(seriesStart).add(fourHourSlotNumber * 4, 'hours').minutes(0).seconds(0);
        const endTime = moment(startTime).add(4, 'hours');

        // eslint-disable-next-line max-len
        const url = `https://members.iracing.com/membersite/member/GetSessionTimes?start=${startTime.format('YYYY-MM-DD+HH:mm:ss')}&end=${endTime.format('YYYY-MM-DD+HH:mm:ss')}&season=${series.seasonId}&max=10`;

        await sleep(20);
        const { data } = await axios.get(url, {
          headers: {
            Cookie: cookie.cookieString(),
          },
        });

        const dataMap = data.m;

        const sessions = data.d.r ? data.d.r.map(
          (raceData) => Object.entries(raceData).reduce(
            (output, [key, value]) => ({
              ...output,
              [dataMap[key]]: value,
            }),
            {},
          ),
        ) : [];

        const sessionRaces = sessions.filter((session) => session.eventtypeid === 5);

        times.push(sessionRaces.map((race) => ({
          raceweek: race.raceweek,
          startTime: moment(race.starttime).format('YYYY-MM-DDTHH:mm:ss'),
        })));
      }

      const timesByRaceweek = flatten(times).reduce((output, { raceweek, startTime }) => {
        const outputRaceweek = output[raceweek] ? output[raceweek] : [];
        return {
          ...output,
          [raceweek]: [...outputRaceweek, startTime],
        };
      }, {});

      seriesTimes.push({
        seriesId: series.seriesId,
        timesByRaceweek,
      });
      await writeFile(
        path.join(__dirname, '../src/data/racetimes.json'),
        JSON.stringify(seriesTimes, null, 2),
      );
    } catch (error) {
      console.error('Error', error.isAxiosError ? error.response : error);
      return [];
    }
  }
})();
