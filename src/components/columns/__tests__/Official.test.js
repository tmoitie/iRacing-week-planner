import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import TickIcon from '../../icon/TickIcon';
import { Official } from '../index';

describe('components/columns/Official', () => {
  test('renders correctly', () => {
    const component = shallow(<Official race={{ official: true }} />);

    expect(component.find(TickIcon).length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  test('renders false correctly', () => {
    const component = shallow(<Official race={{ official: false }} />);

    expect(component.find(TickIcon).length).toBe(0);
    expect(component).toMatchSnapshot();
  });
});
