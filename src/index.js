/* eslint global-require: 0 */
import 'babel-polyfill';
import 'es5-shim';
import 'es5-shim/es5-sham';

import rollbar from 'rollbar/dist/rollbar.umd.js';

if (process.env.ROLLBAR_CLIENT_KEY) {
  rollbar.init({
    accessToken: process.env.ROLLBAR_CLIENT_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      client: {
        javascript: {
          source_map_enabled: true,
          code_version: process.env.CODE_VERSION,
          guess_uncaught_frames: true
        }
      },
      environment: 'production'
    }
  });
}

require('./entry');

