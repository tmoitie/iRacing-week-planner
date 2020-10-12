import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import LinkIcon from '../LinkIcon';

describe('components/icon/LinkIcon', () => {
  test('renders correctly', () => {
    const component = shallow(<LinkIcon />);

    expect(component).toMatchSnapshot();
  });
});
