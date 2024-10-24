import { describe, test, expect } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContentModal from '../ContentModal';

describe('components/modal/ContentModal', () => {
  test('renders positive interactions correctly', async () => {
    const user = userEvent.setup();
    const save = jest.fn();
    const saveFavourites = jest.fn();
    const { container } = render(
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
          { id: 999, name: 'Ferrari', type: 'road' },
        ]}
        ownedContent={[999]}
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

    expect(container.firstChild).toMatchSnapshot();

    await user.click(screen.getByLabelText('Select all oval'));
    expect(save).toHaveBeenCalledWith(expect.toIncludeSameMembers([123, 234, 999]));
    save.mockClear();

    await user.click(screen.getByLabelText('Select all road'));
    expect(save).toHaveBeenCalledWith(expect.toIncludeSameMembers([456, 645, 999]));
    save.mockClear();

    await user.click(screen.getByLabelText('Select all'));
    expect(save).toHaveBeenCalledWith(expect.toIncludeSameMembers([123, 234, 456, 645, 999]));
    save.mockClear();

    await user.click(screen.getByLabelText('Toyota'));
    expect(save).toHaveBeenCalledWith(expect.toIncludeSameMembers([234, 999]));
    save.mockClear();

    await user.click(screen.getByTestId('cars-favourite-oval'));
    expect(saveFavourites).toHaveBeenCalledWith(expect.toIncludeSameMembers([123, 234, 456]));
    save.mockClear();

    await user.click(screen.getByTestId('cars-favourite-road'));
    expect(saveFavourites).toHaveBeenCalledWith(expect.toIncludeSameMembers([456, 645, 999]));
    save.mockClear();

    await user.click(screen.getByTestId('cars-favourite-all'));
    expect(saveFavourites).toHaveBeenCalledWith(expect.toIncludeSameMembers([123, 234, 456, 645, 999]));
    save.mockClear();

    await user.click(screen.getByTestId('cars-favourite-item-123'));
    expect(saveFavourites).toHaveBeenCalledWith(expect.toIncludeSameMembers([123, 456]));
    save.mockClear();
  });

  test('renders negative interactions correctly', async () => {
    const user = userEvent.setup();
    const save = jest.fn();
    const saveFavourites = jest.fn();
    const { container } = render(
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
          { id: 999, name: 'Ferrari', type: 'road' },
        ]}
        ownedContent={[123, 234, 456, 645, 999]}
        defaultContent={[456]}
        idField="id"
        typeFilter={{
          key: 'type',
          oval: 'oval',
          road: 'road',
        }}
        favourites={[123, 234, 456, 645, 999]}
        saveFavourites={saveFavourites}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();

    await user.click(screen.getByLabelText('Select all oval'));
    expect(save).toHaveBeenCalledWith(expect.toIncludeSameMembers([456, 645, 999]));
    save.mockClear();

    await user.click(screen.getByLabelText('Select all road'));
    expect(save).toHaveBeenCalledWith(expect.toIncludeSameMembers([123, 234, 456]));
    save.mockClear();

    await user.click(screen.getByLabelText('Select all'));
    expect(save).toHaveBeenCalledWith(expect.toIncludeSameMembers([456]));
    save.mockClear();

    await user.click(screen.getByLabelText('Toyota'));
    expect(save).toHaveBeenCalledWith(expect.toIncludeSameMembers([123, 456, 645, 999]));
    save.mockClear();

    await user.click(screen.getByTestId('cars-favourite-oval'));
    expect(saveFavourites).toHaveBeenCalledWith(expect.toIncludeSameMembers([456, 645, 999]));
    save.mockClear();

    await user.click(screen.getByTestId('cars-favourite-road'));
    expect(saveFavourites).toHaveBeenCalledWith(expect.toIncludeSameMembers([123, 234]));
    save.mockClear();

    await user.click(screen.getByTestId('cars-favourite-all'));
    expect(saveFavourites).toHaveBeenCalledWith([]);
    save.mockClear();

    await user.click(screen.getByTestId('cars-favourite-item-123'));
    expect(saveFavourites).toHaveBeenCalledWith(expect.toIncludeSameMembers([234, 456, 645, 999]));
    save.mockClear();
  });
});
