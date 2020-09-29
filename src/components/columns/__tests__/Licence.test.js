import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import { Licence } from '../index';

describe('components/columns/Licence', () => {
  test('renders correctly', () => {
    const component = shallow(<Licence race={{ licenceLevel: 7 }} />);

    expect(component).toMatchSnapshot();
  });
});
