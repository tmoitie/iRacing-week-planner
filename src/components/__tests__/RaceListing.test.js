import { describe, test, beforeEach, afterEach } from '@jest/globals';
import moment from 'moment';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockDate from 'mockdate';
import { UPDATE_SETTING } from '../../actions/settings';

import RaceListing from '../RaceListing';
import { defaultFilters } from '../../reducers/settings';

import '../../data/season.json';
import '../../data/racelengths.json';
import '../../data/racetimes.json';

jest.mock('../../data/season.json');
jest.mock('../../data/racelengths.json');
jest.mock('../../data/racetimes.json');

const mockStore = configureMockStore([thunk]);

const createNodeMock = (element) => {
  if (element.type === 'td') {
    return { clientHeight: 50 };
  }

  return null;
};

describe('components/RaceListing', () => {
  const defaultStore = {
    settings: {
      sort: { key: 'id', order: 'asc' },
      filters: defaultFilters,
      favouriteSeries: [],
      ownedTracks: [],
      ownedCars: [],
      favouriteCars: [],
      favouriteTracks: [],
      columns: ['id'],
    },
    app: {
      date: moment('2020-09-23T01:00:00.000Z'),
    },
  };

  beforeEach(() => {
    MockDate.set('2020-09-23T13:30:00.000Z');
  });

  afterEach(() => {
    MockDate.reset();
  });

  const getMockStore = (settingsOverrides = {}, filtersOverrides = {}) => mockStore({
    ...defaultStore,
    settings: {
      ...defaultStore.settings,
      ...settingsOverrides,
      filters: {
        ...defaultStore.settings.filters,
        ...filtersOverrides,
      },
    },
  });

  const getSortExpectation = (sortVars) => expect.objectContaining({
    type: UPDATE_SETTING,
    payload: expect.objectContaining({
      key: 'sort',
      value: expect.objectContaining(sortVars),
    }),
  });

  test('renders correctly', () => {
    const component = renderer.create(<Provider store={getMockStore()}><RaceListing /></Provider>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('changes sort on click', () => {
    const store = getMockStore({
      sort: { key: 'id', order: 'asc' },
      columns: ['id', 'series'],
    });

    const component = renderer.create(<Provider store={store}><RaceListing /></Provider>, { createNodeMock });

    expect(component.toJSON()).toMatchSnapshot();

    component.root.findByProps({ id: 'raceListing-th-id' }).children[0].props.onClick();

    expect(store.getActions()[0]).toEqual(getSortExpectation({ key: 'id', order: 'desc' }));

    component.root.findByProps({ id: 'raceListing-th-series' }).children[0].props.onClick();

    expect(store.getActions()[1]).toEqual(getSortExpectation({ key: 'series', order: 'asc' }));
  });

  test('changes descending sort on click', () => {
    const store = getMockStore({
      sort: { key: 'series', order: 'desc' },
      columns: ['id', 'series', 'raceTimes'],
    });
    const component = renderer.create(<Provider store={store}><RaceListing /></Provider>, { createNodeMock });
    expect(component.toJSON()).toMatchSnapshot();

    component.root.findByProps({ id: 'raceListing-th-series' }).children[0].props.onClick();

    expect(store.getActions()[0]).toEqual(getSortExpectation({ key: 'series', order: 'asc' }));

    expect(component.root.findByProps({ id: 'raceListing-th-raceTimes' }).children[0]).toBeString();
  });

  test('renders not found favourite series', () => {
    const store = getMockStore({ favouriteSeries: [543] }, { favouriteSeries: true });

    const component = renderer.create(<Provider store={store}><RaceListing /></Provider>);

    expect(component.toJSON()).toMatchSnapshot();
    expect(component.root.findAllByType('table')).toEqual([]);
  });

  test('renders not found favourite cars', () => {
    const store = getMockStore({ favouriteCars: [9999] }, { favouriteCarsOnly: true });

    const component = renderer.create(<Provider store={store}><RaceListing /></Provider>);

    expect(component.toJSON()).toMatchSnapshot();
    expect(component.root.findAllByType('table')).toEqual([]);
  });

  test('renders not found favourite tracks', () => {
    const store = getMockStore({ favouriteTracks: [9999] }, { favouriteTracksOnly: true });

    const component = renderer.create(<Provider store={store}><RaceListing /></Provider>);

    expect(component.toJSON()).toMatchSnapshot();
    expect(component.root.findAllByType('table')).toEqual([]);
  });
});
