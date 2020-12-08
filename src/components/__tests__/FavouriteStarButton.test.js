import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';

import FavouriteStarButton from '../FavouriteStarButton';

describe('components/FavouriteStarButton', () => {
  test('renders correctly', () => {
    const component = shallow(<FavouriteStarButton />);

    component.simulate('click');

    expect(component).toMatchSnapshot();
  });

  test('renders enabled with onClick', () => {
    const onClick = jest.fn();
    const component = shallow(<FavouriteStarButton enabled onClick={onClick} />);

    component.simulate('click');

    expect(component).toMatchSnapshot();
    expect(onClick).toHaveBeenCalledWith(false);
  });

  test('renders disabled with onClick', () => {
    const onClick = jest.fn();
    const component = shallow(<FavouriteStarButton onClick={onClick} />);

    component.simulate('click');

    expect(component).toMatchSnapshot();
    expect(onClick).toHaveBeenCalledWith(true);
  });
});
