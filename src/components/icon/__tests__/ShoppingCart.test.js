import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import ShoppingCartIcon from '../ShoppingCartIcon';

describe('components/icon/ShoppingCartIcon', () => {
  test('renders correctly', () => {
    const component = shallow(<ShoppingCartIcon />);

    expect(component).toMatchSnapshot();
  });
});
