
import { describe, test } from '@jest/globals';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import CarModal from '../CarModal';

import '../../../data/cars.json';

jest.mock('../../../data/cars.json');

describe('components/modal/CarModal', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  })

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  })

  test('renders correctly', () => {
    const onClose = jest.fn();
    const component = renderer.create(
      <CarModal
        onClose={onClose}
        ownedCars={[10494, 10410]}
        favouriteCars={[10461, 10410]}
        isOpen={true}
        carIds={[10410, 10494, 10461, 10405]}
        seriesName="Audi Spectacular"
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();

    const closeButton = component.root.findByProps({ className: 'close' });
    closeButton.props.onClick({ preventDefault: () => {}, stopPropagation: () => {}});
    expect(onClose).toBeCalled();


  });
});
