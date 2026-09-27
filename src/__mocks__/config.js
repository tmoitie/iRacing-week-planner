import moment from 'moment';

export const seasonStart = moment('2022-09-06T00:00:00.000Z').utc();
export const seasonEnd = moment('2022-12-06T00:00:00.000Z').utc();
export const weekSeasonStart = moment('2022-09-06T00:00:00.000Z').utc();

export const firebaseConfig = {
  apiKey: 'test-api-key',
  authDomain: 'test.firebaseapp.com',
  databaseURL: 'https://test.firebaseio.com',
  projectId: 'test-project',
  storageBucket: 'test.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:0000000000000000000000',
};
