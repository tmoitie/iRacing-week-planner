import { remote } from 'webdriverio';
import fs from 'fs';
import path from 'path';
import { promisify } from 'bluebird';

import seasonFilter from './scraper-filters/seasonFilter';
import tracksFilter from './scraper-filters/tracksFilter';
import carsFilter from './scraper-filters/carsFilter';

const writeFile = promisify(fs.writeFile);

const username = process.env.IWP_USERNAME || 'test';
const password = process.env.IWP_PASSWORD || 'test';

const extractJSONString = (sourceLines, variableName, fileName, filter = (a) => a) => {
  const regexp = new RegExp(`^var ${variableName} = extractJSON\\('`);
  const listingLine = sourceLines.filter(line => line.search(regexp) !== -1)[0];
  if (listingLine === undefined || listingLine.length === 0) {
    console.error(`${variableName} could not be found`);
    process.exit(1);
  }
  const listingJson = listingLine
    .replace(regexp, '')
    .replace(/'\);$/, '');

  const listing = JSON.parse(listingJson);
  const filteredListing = filter(listing);
  writeFile(path.join(__dirname, fileName), JSON.stringify(filteredListing, null, 2));
};

(async () => {
  const browser = await remote({
    logLevel: 'error',
    // desiredCapabilities: { browserName: 'phantomjs' },
    capabilities: {
        browserName: 'phantomjs'
    }
  });

  await browser.url('https://members.iracing.com/membersite/login.jsp');

  const userField = await browser.$('[name="username"]');
  await userField.addValue(username);

  const passwordField = await browser.$('[name="password"]');
  await passwordField.addValue(password);

  const button = await browser.$('input.log-in');
  await button.click();

  await browser.waitUntil(async () => {
    const url = await browser.getUrl();
    return url === 'https://members.iracing.com/membersite/member/Home.do';
  }, 5000, 'expected to be logged in');

  await browser.url('http://members.iracing.com/membersite/member/Series.do');

  const source = await browser.getPageSource();
  const sourceLines = source.split('\n');

  extractJSONString(sourceLines, 'TrackListing', '../src/data/tracks.json', tracksFilter);
  extractJSONString(sourceLines, 'CarClassListing', '../src/data/car-class.json');
  extractJSONString(sourceLines, 'CarListing', '../src/data/cars.json', carsFilter);
  extractJSONString(sourceLines, 'SeasonListing', '../src/data/season.json', seasonFilter);

  await browser.deleteSession();
})().catch((e) => console.error(e));
