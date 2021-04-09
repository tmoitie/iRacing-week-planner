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
import {username, password} from './credentials';
const writeFile = Promise.promisify(fs.writeFile);

const seriesIds = process.argv.slice(2).map((id) => parseInt(id, 10));

let seriess = uniqBy(races, (race) => race.seriesId);

if (seriesIds.length > 0) {
  seriess = seriess.filter((series) => seriesIds.includes(series.seriesId));
}


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const cookie = await login(page, username, password);

  await browser.close();

  const seriesTimes = [];

  for await (const series of seriess) {
    const now = moment().utc();
    const nextFullRaceWeek = races.find((race) => race.seriesId === series.seriesId && race.startTime.isAfter(now));

    if (nextFullRaceWeek === undefined) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const weekStart = moment(nextFullRaceWeek.startTime);
    const weekEnd = moment(nextFullRaceWeek.endTime);
    const numberFourHourSlots = weekEnd.diff(weekStart, 'days') * 6;

    console.log(
      series.seriesId,
      weekStart.toISOString(),
      weekEnd.toISOString(),
      numberFourHourSlots,
    );

    const fourHourSlots = range(0, numberFourHourSlots);

    try {
      const times = [];
      let numberOfTimes = 0;
      let repeator = false;
      for await (const fourHourSlotNumber of fourHourSlots) {
        console.log(fourHourSlotNumber, numberOfTimes);
        if (fourHourSlotNumber === 4 && numberOfTimes >= 8) {
          // is repeated at least every 2 hours, easy to figure out now
          repeator = true;
          break;
        }
        const startTime = moment(weekStart).add(fourHourSlotNumber * 4, 'hours').minutes(0).seconds(0);
        const endTime = moment(startTime).add({ hours: 3, minutes: 59, seconds: 59 });

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
        numberOfTimes += sessionRaces.length;
      }

      const timesByRaceweek = flatten(times).reduce((output, { raceweek, startTime }) => {
        const outputRaceweek = output[raceweek] ? output[raceweek] : [];
        return {
          ...output,
          [raceweek]: [...outputRaceweek, startTime],
        };
      }, {});

      const weekTimes = timesByRaceweek[nextFullRaceWeek.week];

      if (repeator) {
        seriesTimes.push({
          seriesId: series.seriesId,
          everytime: {
            minutes: moment.duration(moment(weekTimes[1]).diff(moment(weekTimes[0]))).as('minutes'),
          },
          offset: {
            minutes: moment.duration(moment(weekTimes[0]).diff(nextFullRaceWeek.startTime)).as('minutes'),
          },
        });
        // eslint-disable-next-line no-continue
        continue;
      }

      seriesTimes.push({
        seriesId: series.seriesId,
        setTimes: weekTimes.map(
          (weekTime) => ({
            minutes: moment.duration(moment(weekTime).diff(nextFullRaceWeek.startTime)).asMinutes(),
          }),
        ),
      });
    } catch (error) {
      console.error('Error', error.isAxiosError ? error.response : error);
      return [];
    }
  }

  await writeFile(
    path.join(__dirname, '../src/data/racetimes.json'),
    JSON.stringify(seriesTimes, null, 2),
  );
})();
