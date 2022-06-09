import moment from 'moment';
import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import StartDate from '../StartDate';

describe('components/columns/StartDate', () => {
  test('renders correctly', () => {
    const component = shallow(
      <StartDate
        race={{
          startTime: moment('2020-09-22T01:00:00.000Z').utc(),
        }}
      />,
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toBe('9/22/2020'); // Node uses US I18n DateFormat
  });
});
