import React from 'react';
import { create, act } from 'react-test-renderer';
import { describe, test } from '@jest/globals';
import CarModal from '../../modal/CarModal';

import Car from '../Car';

describe('components/columns/Car', () => {
  test('renders correctly', () => {
    const component = create(<Car
      race={{
        carIds: [4, 5],
        carClasses: ['Mazda Cup'],
        series: 'Mazda Cup',
      }}
      favouriteCars={[]}
      ownedCars={[]}
    />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders owned, favourite', () => {
    const component = create(<Car
      race={{
        carIds: [4, 5],
        carClasses: ['Mazda Cup'],
        series: 'Mazda Cup',
      }}
      favouriteCars={[4]}
      ownedCars={[5]}
    />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('opens modal', () => {
    let component;
    act(() => {
      component = create(<Car
        race={{
          carIds: [4, 5],
          carClasses: ['Mazda Cup'],
          series: 'Mazda Cup',
        }}
        favouriteCars={[4]}
        ownedCars={[5]}
      />);
    });

    act(() => {
      component.root.findByType('button').props.onClick();
    });

    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
      component.root.findByProps({ className: 'glyphicon glyphicon-remove' }).parent.parent.props.onClick({
        preventDefault: () => {},
        stopPropagation: () => {},
      });
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
