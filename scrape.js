import { remote } from 'webdriverio';
import fs from 'fs';
import path from 'path';
import { promisify } from 'bluebird';

const writeFile = promisify(fs.writeFile);

const client = remote({
  logLevel: 'command',
  desiredCapabilities: { browserName: 'firefox' }
}).init();

const username = process.env.IWP_USERNAME || 'test';
const password = process.env.IWP_PASSWORD || 'test';

client
  .url('https://members.iracing.com/membersite/login.jsp')
  .addValue('[name="username"]', username)
  .addValue('[name="password"]', password)
  .click('input.log-in')
  .url('http://members.iracing.com/membersite/member/Series.do')
  .waitForVisible('.simpleNav #navigation', 5000)
  .execute('return TrackListing;')
  .then(result => writeFile(path.join(__dirname, 'src/data/tracks.json'), JSON.stringify(result.value, null, 2)))
  .execute('return CarClassListing;')
  .then(result => writeFile(path.join(__dirname, 'src/data/car-class.json'), JSON.stringify(result.value, null, 2)))
  .execute('return CarListing;')
  .then(result => writeFile(path.join(__dirname, 'src/data/cars.json'), JSON.stringify(result.value, null, 2)))
  .execute('return SeasonListing;')
  .then(result => writeFile(path.join(__dirname, 'src/data/season.json'), JSON.stringify(result.value, null, 2)))
  .end();
