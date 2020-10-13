import { describe, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';

import ContentModal from '../ContentModal';

describe('components/modal/ContentModal', () => {
  test('renders correctly', () => {
    const save = jest.fn();
    const saveFavourites = jest.fn();
    const component = shallow(
      <ContentModal
        id="cars"
        title="Cars Modal"
        isOpen
        onClose={() => {}}
        save={save}
        content={[
          { id: 123, skuname: 'Ford', type: 'oval' },
          { id: 234, skuname: 'Toyota', type: 'oval' },
          { id: 456, name: 'Mazda', type: 'road' },
          { id: 645, name: 'McLaren', type: 'road' },
        ]}
        ownedContent={[123, 456, 645]}
        defaultContent={[456]}
        idField="id"
        typeFilter={{
          key: 'type',
          oval: 'oval',
          road: 'road',
        }}
        favourites={[456]}
        saveFavourites={saveFavourites}
      />,
    );

    expect(component).toMatchSnapshot();

    component.find({ id: 'cars-select-oval' }).props().onChange(true);
    expect(save).toBeCalledWith(expect.toIncludeSameMembers([123, 234, 456, 645]));
    save.mockClear();

    component.find({ id: 'cars-select-oval' }).props().onChange(false);
    expect(save).toBeCalledWith(expect.toIncludeSameMembers([456, 645]));
    save.mockClear();

    component.find({ id: 'cars-select-road' }).props().onChange(false);
    expect(save).toBeCalledWith(expect.toIncludeSameMembers([123, 456])); // 456 is default
    save.mockClear();

    component.find({ id: 'cars-select-road' }).props().onChange(true);
    expect(save).toBeCalledWith(expect.toIncludeSameMembers([123, 456, 645]));
    save.mockClear();

    component.find({ id: 'cars-select-all' }).props().onChange(true);
    expect(save).toBeCalledWith(expect.toIncludeSameMembers([123, 234, 456, 645]));
    save.mockClear();

    component.find({ id: 'cars-select-all' }).props().onChange(false);
    expect(save).toBeCalledWith(expect.toIncludeSameMembers([456])); // 456 is default
    save.mockClear();

    component.find({ id: 'cars-select-item-234' }).props().onChange(true);
    expect(save).toBeCalledWith(expect.toIncludeSameMembers([123, 234, 456, 645]));
    save.mockClear();

    component.find({ id: 'cars-select-item-123' }).props().onChange(false);
    expect(save).toBeCalledWith(expect.toIncludeSameMembers([456, 645]));
    save.mockClear();

    component.find({ id: 'cars-favourite-oval' }).props().onClick(true);
    expect(saveFavourites).toBeCalledWith(expect.toIncludeSameMembers([123, 234, 456]));
    saveFavourites.mockClear();

    component.find({ id: 'cars-favourite-oval' }).props().onClick(false);
    expect(saveFavourites).toBeCalledWith(expect.toIncludeSameMembers([456]));
    saveFavourites.mockClear();

    component.find({ id: 'cars-favourite-road' }).props().onClick(true);
    expect(saveFavourites).toBeCalledWith(expect.toIncludeSameMembers([456, 645]));
    saveFavourites.mockClear();

    component.find({ id: 'cars-favourite-road' }).props().onClick(false);
    expect(saveFavourites).toBeCalledWith(expect.toIncludeSameMembers([]));
    saveFavourites.mockClear();

    component.find({ id: 'cars-favourite-all' }).props().onClick(true);
    expect(saveFavourites).toBeCalledWith(expect.toIncludeSameMembers([123, 234, 456, 645]));
    saveFavourites.mockClear();

    component.find({ id: 'cars-favourite-all' }).props().onClick(false);
    expect(saveFavourites).toBeCalledWith(expect.toIncludeSameMembers([]));
    saveFavourites.mockClear();

    component.find({ id: 'cars-favourite-item-456' }).props().onClick(false);
    expect(saveFavourites).toBeCalledWith(expect.toIncludeSameMembers([]));
    saveFavourites.mockClear();

    component.find({ id: 'cars-favourite-item-123' }).props().onClick(true);
    expect(saveFavourites).toBeCalledWith(expect.toIncludeSameMembers([123, 456]));
    saveFavourites.mockClear();
  });
});
