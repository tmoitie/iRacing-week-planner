import { describe, test } from '@jest/globals';
import moment from 'moment';
import MockDate from 'mockdate';

import availableColumns from '../availableColumns';

const getColumnById = (findId: string) => availableColumns.find(({ id }) => id === findId);

const defaultSeries = {
  seriesId: 6,
  licenceClassNumber: 3,
  series: 'Abc',
  licenceLevel: 5,
  type: 'Road',
  track: 'Road Atlanta',
  carClasses: ['Mazda', 'Pontiac'],
  startTime: moment('2021-12-12T12:00:00Z'),
  everyTime: moment.duration(1, 'hours'),
  offset: moment.duration(30, 'minutes'),
  weekLength: moment.duration(24, 'hours'),
  setTimes: null,
  official: true,
  fixed: false,
};

const expectColumnToSortTests = (column, a, b) => {
  expect(column.sort('asc', a, b)).toBe(1);
  expect(column.sort('asc', b, a)).toBe(-1);
  expect(column.sort('desc', a, b)).toBe(-1);
  expect(column.sort('desc', b, a)).toBe(1);
  expect(column.sort('desc', b, b)).toBe(0);
};

describe('data/availableColumns', () => {
  test('default sort / class column', () => {
    const column = getColumnById('class');
    const a = { ...defaultSeries, licenceClassNumber: 3 };
    const b = { ...defaultSeries, licenceClassNumber: 2 };

    expect(column.sort('asc', a, b)).toBe(1);
    expect(column.sort('asc', b, a)).toBe(-1);
    expect(column.sort('desc', a, b)).toBe(-1);
    expect(column.sort('desc', b, a)).toBe(1);

    const aFallback = { ...defaultSeries, series: 'Abc' };
    const bFallback = { ...defaultSeries, series: 'Def' };

    expect(column.sort('asc', aFallback, bFallback)).toBe(-1);
    expect(column.sort('asc', bFallback, aFallback)).toBe(1);
    expect(column.sort('desc', aFallback, bFallback)).toBe(1);
    expect(column.sort('desc', bFallback, aFallback)).toBe(-1);
    expect(column.sort('desc', aFallback, aFallback)).toBe(0);
  });

  test('id column', () => {
    const column = getColumnById('id');
    const a = { ...defaultSeries, seriesId: 8 };
    const b = { ...defaultSeries, seriesId: 6 };
    expectColumnToSortTests(column, a, b);
  });

  test('licence column', () => {
    const column = getColumnById('licence');
    const a = { ...defaultSeries, licenceLevel: 8 };
    const b = { ...defaultSeries, licenceLevel: 6 };
    expectColumnToSortTests(column, a, b);
  });

  test('type column', () => {
    const column = getColumnById('type');
    const a = { ...defaultSeries, type: 'Road' };
    const b = { ...defaultSeries, type: 'Oval' };
    expectColumnToSortTests(column, a, b);
  });

  test('series column', () => {
    const column = getColumnById('series');
    const a = { ...defaultSeries, series: 'Def' };
    const b = { ...defaultSeries, series: 'Abc' };
    expectColumnToSortTests(column, a, b);
  });

  test('track column', () => {
    const column = getColumnById('track');
    const a = { ...defaultSeries, track: 'Road Atlanta' };
    const b = { ...defaultSeries, track: 'Road America' };
    expectColumnToSortTests(column, a, b);
  });

  test('car column', () => {
    const column = getColumnById('car');
    const a = { ...defaultSeries, carClasses: ['Mazda', 'Pontiac'] };
    const b = { ...defaultSeries, carClasses: ['GT3'] };
    expectColumnToSortTests(column, a, b);
  });

  test('start column', () => {
    const column = getColumnById('start');
    const a = { ...defaultSeries, startTime: moment('2021-12-12T15:00:00Z') };
    const b = { ...defaultSeries, startTime: moment('2021-12-12T12:00:00Z') };
    expectColumnToSortTests(column, a, b);
    const missing = { ...defaultSeries, startTime: undefined };
    expect(column.sort('desc', a, missing)).toBe(-1);
    expect(column.sort('desc', missing, b)).toBe(1);
    const sameNumberB = { ...defaultSeries, startTime: moment('2021-12-12T12:00:00Z') };
    expect(column.sort('desc', b, sameNumberB)).toBe(0);
  });

  test('end column', () => {
    const column = getColumnById('end');
    const a = { ...defaultSeries, startTime: moment('2021-12-12T15:00:00Z') };
    const b = { ...defaultSeries, startTime: moment('2021-12-12T12:00:00Z') };
    expectColumnToSortTests(column, a, b);
  });

  test('official column', () => {
    const column = getColumnById('official');
    const a = { ...defaultSeries, official: true };
    const b = { ...defaultSeries, official: false };
    expectColumnToSortTests(column, a, b);
  });

  test('fixed column', () => {
    const column = getColumnById('fixed');
    const a = { ...defaultSeries, fixed: true };
    const b = { ...defaultSeries, fixed: false };
    expectColumnToSortTests(column, a, b);
  });

  test('nextRace column', () => {
    MockDate.set('2022-09-07T13:30:00.000Z');
    const column = getColumnById('nextRace');
    // Race 1 = 45 mins
    const a = { ...defaultSeries, everyTime: null, offset: null, setTimes: [moment.duration(45, 'minutes')] };
    // Race 1 = 90 mins
    const b = { ...defaultSeries, everyTime: moment.duration(1, 'hours'), offset: moment.duration(30, 'minutes') };
    expectColumnToSortTests(column, a, b);

    const nextNullTime = {
      ...defaultSeries,
      everyTime: null,
      offset: null,
      setTimes: null,
    };

    expect(column.sort('asc', nextNullTime, nextNullTime)).toBe(0);
    expect(column.sort('asc', a, nextNullTime)).toBe(-1);
    expect(column.sort('asc', nextNullTime, a)).toBe(1);
    expect(column.sort('desc', a, nextNullTime)).toBe(1);
    expect(column.sort('desc', nextNullTime, a)).toBe(-1);

    MockDate.reset();
  });
});
