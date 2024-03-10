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

  await auth(username, password);

  const tracks = await getTracks();

  await writeFile(path.join(__dirname, '../src/data/tracks.json'), JSON.stringify(tracks, null, 2));

  const cars = await getCars();
  await writeFile(
    path.join(__dirname, '../src/data/cars.json'),
    JSON.stringify(cars, null, 2),
  );

  const season = await getSeason(cars, tracks);
  await writeFile(
    path.join(__dirname, '../src/data/season.json'),
    JSON.stringify(season, null, 2),
  );

  const contributors = await getContributors(process.env.GH_TOKEN);
  await writeFile(
    path.join(__dirname, '../src/data/contributors.json'),
    JSON.stringify(contributors, null, 2),
  );

  const carClasses = await getCarClasses();
  await writeFile(
    path.join(__dirname, '../src/data/car-class.json'),
    JSON.stringify(carClasses, null, 2),
  );
})();
