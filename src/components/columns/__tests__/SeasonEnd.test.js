import moment from 'moment';
import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import SeasonEnd from '../SeasonEnd';

describe('components/columns/SeasonEnd', () => {
  test('renders correctly', () => {
    const component = shallow(
      <SeasonEnd
        race={{
          seriesEnd: moment('2020-09-26T01:00:00.000Z').utc(),
        }}
      />,
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toBe('9/26/2020'); // Node uses US I18n DateFormat
  });
});
