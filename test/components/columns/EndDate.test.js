import moment, { duration } from 'moment';
import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import EndDate from '../../../src/components/columns/EndDate';

describe('components/columns/EndDate', () => {
  test('renders correctly', () => {
    const component = shallow(
      <EndDate
        race={{
          startDate: moment('2020-09-22T00:00:00.000Z'),
          weekLength: duration({ days: 7 }),
        }}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toBe("2020-09-29");
  });
});
