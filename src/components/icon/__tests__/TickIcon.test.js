import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import TickIcon from '../TickIcon';

describe('components/icon/TickIcon', () => {
  test('renders correctly', () => {
    const component = shallow(<TickIcon />);

    expect(component).toMatchSnapshot();
  });
});
