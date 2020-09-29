import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import Class from '../Class';

describe('components/columns/Class', () => {
  test('renders correctly', () => {
    const component = shallow(<Class race={{ licenceLevel: 5 }} />);

    expect(component).toMatchSnapshot();
  });
});
