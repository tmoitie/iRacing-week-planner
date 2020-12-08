import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import BuyACoffee from '../BuyACoffee';

describe('components/BuyACoffee', () => {
  test('renders correctly', () => {
    const component = shallow(<BuyACoffee />);

    expect(component).toMatchSnapshot();
  });
});
