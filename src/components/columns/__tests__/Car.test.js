import React from 'react';
import { shallow } from 'enzyme';
import { describe, test } from '@jest/globals';
import CarModal from '../../modal/CarModal';

import Car from '../Car';

describe('components/columns/Car', () => {
  test('renders correctly', () => {
    const component = shallow(<Car
      race={{
        carIds: [4, 5],
        carClasses: ['Mazda Cup'],
        series: 'Mazda Cup',
      }}
      favouriteCars={[]}
      ownedCars={[]}
    />);

    expect(component).toMatchSnapshot();
  });

  test('renders owned, favourite', () => {
    const component = shallow(<Car
      race={{
        carIds: [4, 5],
        carClasses: ['Mazda Cup'],
        series: 'Mazda Cup',
      }}
      favouriteCars={[4]}
      ownedCars={[5]}
    />);

    expect(component).toMatchSnapshot();
  });

  test('opens modal', () => {
    const component = shallow(<Car
      race={{
        carIds: [4, 5],
        carClasses: ['Mazda Cup'],
        series: 'Mazda Cup',
      }}
      favouriteCars={[4]}
      ownedCars={[5]}
    />);

    component.first().simulate('click');

    expect(component).toMatchSnapshot();

    component.find(CarModal).first().props().onClose();

    expect(component).toMatchSnapshot();
  });
});
