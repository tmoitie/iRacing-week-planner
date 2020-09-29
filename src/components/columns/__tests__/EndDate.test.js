import moment, { duration } from 'moment';
import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import EndDate from '../EndDate';

describe('components/columns/EndDate', () => {
  test('renders correctly', () => {
    const component = shallow(
      <EndDate
        race={{
          startTime: moment('2020-09-22T01:00:00.000Z'),
          weekLength: duration({ days: 7 }),
        }}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toBe("2020-09-28");
  });
});
