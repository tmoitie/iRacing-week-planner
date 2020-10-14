import moment from 'moment';

export const seasonStart = moment('2020-09-15T00:00:00+00:00').utc();
export const seasonEnd = moment('2020-12-14T00:00:00+00:00').utc();
export const weekSeasonStart = moment('2020-09-15T00:00:00+00:00').utc();

export const firebaseConfig = {
  apiKey: 'AIzaSyAWNRqHLhhvhzKl0gkKybocd0nAk2eTlVg',
  authDomain: 'iracing-week-planner.firebaseapp.com',
  databaseURL: 'https://iracing-week-planner.firebaseio.com',
  projectId: 'iracing-week-planner',
  storageBucket: 'iracing-week-planner.appspot.com',
  messagingSenderId: '933939666088',
  appId: '1:933939666088:web:479c8445f2c521044ab69d',
};
