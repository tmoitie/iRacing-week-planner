import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import Id from '../../../src/components/columns/Id';

describe('components/columns/Id', () => {
  test('renders correctly', () => {
    const component = shallow(<Id race={{ seriesId: 234 }} />);

    expect(component).toMatchSnapshot();
    expect(component.text()).toBe("234");
  });
});
