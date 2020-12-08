import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import TickIcon from '../../icon/TickIcon';

import Fixed from '../Fixed';

describe('components/columns/Fixed', () => {
  test('renders correctly', () => {
    const component = shallow(<Fixed race={{ fixed: true }} />);

    expect(component).toMatchSnapshot();
    expect(component.find(TickIcon).length).toBe(1);

    const component2 = shallow(<Fixed race={{ fixed: false }} />);

    expect(component2).toMatchSnapshot();
    expect(component2.find(TickIcon).length).toBe(0);
  });
});
