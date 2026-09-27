import moment from 'moment';

export const seasonStart = moment('2026-09-15T00:00:00+00:00').utc();
export const seasonEnd = moment('2026-12-13T00:00:00+00:00').utc();
export const weekSeasonStart = moment('2026-09-15T00:00:00+00:00').utc();

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
