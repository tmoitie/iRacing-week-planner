import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import StarIcon from '../StarIcon';

describe('components/icon/StarIcon', () => {
  test('renders correctly', () => {
    const component = shallow(<StarIcon />);

    expect(component).toMatchSnapshot();
  });
});
