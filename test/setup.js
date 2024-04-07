import '@testing-library/jest-dom';
import 'snapshot-diff/extend-expect';
import jsdom from 'jsdom';

import '../src/data/season.json';
import '../src/data/cars.json';
import '../src/data/tracks.json';
import '../src/data/contributors.json';
import '../src/data/changelog';
import '../src/config';
import '../src/i18n';

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html></html>');
global.window = dom.window;
global.window.dataLayer = {
  push: jest.fn(),
};
global.document = dom.window.document;

jest.mock('../src/data/season.json');
jest.mock('../src/data/cars.json');
jest.mock('../src/data/tracks.json');
jest.mock('../src/data/contributors.json');
jest.mock('../src/data/changelog');
jest.mock('../src/config');

const oldWindowLocation = window.location;

beforeAll(() => {
  document.body.innerHTML = '';
  delete window.location;
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
    },
  );
});

afterAll(() => {
  document.body.innerHTML = '';
  window.location = oldWindowLocation;
});
