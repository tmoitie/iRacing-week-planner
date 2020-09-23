import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import Fixed from '../../../src/components/columns/Fixed';

describe('components/columns/Fixed', () => {
  test('renders correctly', () => {
    const component = shallow(<Fixed race={{ fixed: true }} />);

    expect(component).toMatchSnapshot();
    expect(component.find('.glyphicon-ok').length).toBe(1);

    const component2 = shallow(<Fixed race={{ fixed: false }} />);

    expect(component2).toMatchSnapshot();
    expect(component2.find('.glyphicon-ok').length).toBe(0);
  });
});
