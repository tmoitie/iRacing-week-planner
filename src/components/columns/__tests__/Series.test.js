import { describe, test, expect } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import SeriesModal from '../../modal/SeriesModal';

import Series from '../Series';
import ClickableCell from '../ClickableCell';

describe('components/columns/Series', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Series
        race={{
          seriesId: 345,
          seasonId: 3450,
          series: 'Rallycross',
        }}
        favouriteSeries={[123, 763]}
        ownedTracks={[]}
        ownedCars={[]}
      />,
    );

    expect(component).toMatchSnapshot();

    component.find(ClickableCell).first().props().onClick();

    expect(component).toMatchSnapshot();

    component.find(SeriesModal).first().props().onClose();

    expect(component).toMatchSnapshot();
  });

  test('renders favourite series', () => {
    const component = shallow(
      <Series
        race={{
          seriesId: 345,
          seasonId: 3450,
          series: 'Rallycross',
        }}
        favouriteSeries={[345, 567]}
        ownedTracks={[123]}
        ownedCars={[]}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
