import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import RemoveIcon from '../RemoveIcon';

describe('components/icon/RemoveIcon', () => {
  test('renders correctly', () => {
    const component = shallow(<RemoveIcon />);

    expect(component).toMatchSnapshot();
  });
});
