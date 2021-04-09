/* eslint-disable no-console */
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import puppeteer from 'puppeteer';
import contributorsFilter from './scraper-filters/contributorsFilter';
import {username, password} from './credentials';

import seasonFilter from './scraper-filters/seasonFilter';
import tracksFilter from './scraper-filters/tracksFilter';
import carsFilter from './scraper-filters/carsFilter';

const writeFile = Promise.promisify(fs.writeFile);


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://members.iracing.com/membersite/login.jsp');

  const userField = await page.$('[name="username"]');
  await userField.focus();
  await userField.type(username);

  const passwordField = await page.$('[name="password"]');
  await passwordField.focus();
  await passwordField.type(password);

  const button = await page.$('input.log-in');
  await button.click();

  await page.waitForResponse('https://members.iracing.com/membersite/member/Home.do');

  await page.goto('http://members.iracing.com/membersite/member/Series.do');

  const trackListing = await page.evaluate(() => window.TrackListing);
  const filteredTrackListing = tracksFilter(trackListing);
  await writeFile(
    path.join(__dirname, '../src/data/tracks.json'),
    JSON.stringify(filteredTrackListing, null, 2),
  );

  const carClassListing = await page.evaluate(() => window.CarClassListing);
  await writeFile(
    path.join(__dirname, '../src/data/car-class.json'),
    JSON.stringify(carClassListing, null, 2),
  );

  const carListing = await page.evaluate(() => window.CarListing);
  const filteredCarListing = carsFilter(carListing);
  await writeFile(
    path.join(__dirname, '../src/data/cars.json'),
    JSON.stringify(filteredCarListing, null, 2),
  );

  const seasonListing = await page.evaluate(() => window.SeasonListing);
  const filteredSeasonListing = seasonFilter(seasonListing);
  await writeFile(
    path.join(__dirname, '../src/data/season.json'),
    JSON.stringify(filteredSeasonListing, null, 2),
  );

  await browser.close();

  const githubToken = process.env.GH_TOKEN;
  const githubOptions = githubToken ? {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  } : {};

  const contribResponse = await axios.get(
    'https://api.github.com/repos/tmoitie/iRacing-week-planner/contributors',
    githubOptions,
  );
  const filteredContributors = contributorsFilter(contribResponse.data);
  await writeFile(
    path.join(__dirname, '../src/data/contributors.json'),
    JSON.stringify(filteredContributors, null, 2),
  );
})().catch((e) => console.error(e));
