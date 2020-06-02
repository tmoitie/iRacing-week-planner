import '@babel/polyfill';
import 'es5-shim';
import 'es5-shim/es5-sham';
// import 'console-polyfill';

import $ from 'jquery';

global.$ = global.jQuery = $;

require('./entry');
