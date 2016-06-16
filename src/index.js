/* eslint global-require: 0 */
import 'es5-shim';
import 'es5-shim/es5-sham';

let start = () => {
  require('./entry');
};

if (process.env.NODE_ENV === 'production' && process.env.AIRBRAKE_KEY) {
  const AirbrakeClient = require('airbrake-js');

  const airbrake = new AirbrakeClient({
    host: 'https://errbit.tmoitie.uk',
    projectId: -1,
    projectKey: process.env.AIRBRAKE_KEY
  });

  start = airbrake.wrap(start);
}

start();
