import { describe, test, expect } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import SeriesModal from '../../modal/SeriesModal';

import Series from '../Series';

describe('components/columns/Series', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Series
        race={{
          seriesId: 345,
          series: 'Rallycross',
        }}
        favouriteSeries={[123, 763]}
        ownedTracks={[]}
      />,
    );

    expect(component).toMatchSnapshot();

    component.first().simulate('click');

    expect(component).toMatchSnapshot();

    component.find(SeriesModal).first().props().onClose();

    expect(component).toMatchSnapshot();
  });

  test('renders favourite series', () => {
    const component = shallow(
      <Series
        race={{
          seriesId: 345,
          series: 'Rallycross',
        }}
        favouriteSeries={[345, 567]}
        ownedTracks={[123]}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
