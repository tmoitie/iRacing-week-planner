import { Slider } from '@blueprintjs/core';
import { describe, test } from '@jest/globals';
import moment from 'moment';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { UPDATE_DAYS } from '../../actions/app';

import DateSlider from '../DateSlider';

const mockStore = configureMockStore([thunk]);

describe('components/DateSlider', () => {
  const defaultStore = {
    app: {
      date: moment('2020-09-23T01:00:00.000Z'),
      daysSinceSeasonStart: 15,
      week: 3,
    },
  };

  test('renders correctly', () => {
    const store = mockStore(defaultStore);
    const component = renderer.create(<Provider store={store}><DateSlider /></Provider>);

    expect(component.toJSON()).toMatchSnapshot();

    component.root.findByType(Slider).props.onChange(3);

    expect(store.getActions()[0].type).toEqual(UPDATE_DAYS);
    expect(store.getActions()[0].days).toBe(3);
  });
});
