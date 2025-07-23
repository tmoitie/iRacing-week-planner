import { writeFile } from 'fs/promises';
import path from 'path';
import { auth } from './api/iracingClient';
import getContributors from './api/getContributors';
import getCars from './api/getCars';
import getTracks from './api/getTracks';
import getSeason from './api/getSeason';
import getCarClasses from './api/getCarClasses';

(async () => {
  const username = process.env.IWP_USERNAME || 'test';
  const password = process.env.IWP_PASSWORD || 'test';

  try {
    console.log('Authenticating with iRacing...');
    await auth(username, password);

    console.log('Fetching track data...');
    const tracks = await getTracks();
    await writeFile(path.join(__dirname, '../src/data/tracks.json'), JSON.stringify(tracks, null, 2));

    console.log('Fetching car data...');
    const cars = await getCars();
    await writeFile(
      path.join(__dirname, '../src/data/cars.json'),
      JSON.stringify(cars, null, 2),
    );

    console.log('Fetching season data...');
    const season = await getSeason(cars, tracks);
    await writeFile(
      path.join(__dirname, '../src/data/season.json'),
      JSON.stringify(season, null, 2),
    );

    console.log('Fetching GitHub contributors...');
    const contributors = await getContributors(process.env.GITHUB_TOKEN);
    await writeFile(
      path.join(__dirname, '../src/data/contributors.json'),
      JSON.stringify(contributors, null, 2),
    );

    console.log('Fetching car classes...');
    const carClasses = await getCarClasses();
    await writeFile(
      path.join(__dirname, '../src/data/car-class.json'),
      JSON.stringify(carClasses, null, 2),
    );

    console.log('All data successfully scraped and saved!');
  } catch (error) {
    console.error('Error occurred while scraping data:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    process.exit(1);
  }
})();
