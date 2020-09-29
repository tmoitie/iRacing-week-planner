import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import SortArrow from '../SortArrow';

describe('components/SortArrow', () => {
  test('renders down correctly', () => {
    const component = shallow(<SortArrow sort={{ order: 'desc', key: 'licence' }} />);

    expect(component.find('.glyphicon-triangle-bottom').length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  test('renders up correctly', () => {
    const component = shallow(<SortArrow sort={{ order: 'asc', key: 'licence' }} />);

    expect(component.find('.glyphicon-triangle-top').length).toBe(1);
    expect(component).toMatchSnapshot();
  });
});
