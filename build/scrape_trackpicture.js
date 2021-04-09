import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import puppeteer from 'puppeteer';
import {username, password} from './credentials';

const writeFile = Promise.promisify(fs.writeFile);


(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {width: 1200, height: 800}
});
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

for(var i = 0; i < trackListing.length ; i++){ 
  var id = trackListing[i].id;
  var screenpath = './public/static/tracks/'+ id + '.png'
  await page.goto('https://members.iracing.com/membersite/member/TrackDetail.do?trkid=' + id);
  await page.re
  await page.waitForSelector('#svgMap');          // wait for the selector to load
  const element = await page.$('#svgMap');        // declare a variable with an ElementHandle
  const bounding_box = await element.boundingBox();
  await element.screenshot({
    path: screenpath,
    clip: {
      x: bounding_box.x,
      y: bounding_box.y + 50,
      width: bounding_box.width,
      height: bounding_box.height - 200,
    },
  });   // take screenshot element in puppeteer
}
  await browser.close();
})().catch((e) => console.error(e));
