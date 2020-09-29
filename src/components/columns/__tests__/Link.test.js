import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import { Link } from '../index';

describe('components/columns/Link', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Link
        race={{
          seasonId: 4234,
        }}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('a').first().prop('href')).toContain("4234");
  });
});
