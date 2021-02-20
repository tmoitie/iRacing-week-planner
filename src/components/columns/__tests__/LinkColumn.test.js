import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import { LinkColumn } from '../index';

describe('components/columns/LinkColumn', () => {
  test('renders correctly', () => {
    const component = shallow(
      <LinkColumn
        race={{
          seasonId: 4234,
        }}
      />,
    );

    expect(component).toMatchSnapshot();
    expect(component.find('a').first().prop('href')).toContain('4234');
  });
});
