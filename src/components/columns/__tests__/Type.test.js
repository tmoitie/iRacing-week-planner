import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import { Type } from '../index';

describe('components/columns/Type', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Type
        race={{
          type: 'RX',
        }}
      />,
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toBe('RX');
  });
});
