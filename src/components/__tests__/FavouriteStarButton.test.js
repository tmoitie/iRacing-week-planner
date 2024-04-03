import React from 'react';
import { render } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import FavouriteStarButton from '../FavouriteStarButton';

describe('components/FavouriteStarButton', () => {
  test('renders correctly', async () => {
    const user = userEvent.setup();
    const { container } = render(<FavouriteStarButton />);

    expect(container).toMatchSnapshot();
  });

  test('renders enabled with onClick', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const { container } = render(<FavouriteStarButton enabled onClick={onClick} />);

    await user.click(container.firstChild);
    expect(container).toMatchSnapshot();
    expect(onClick).toHaveBeenCalledWith(false);
  });

  test('renders disabled with onClick', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const { container } = render(<FavouriteStarButton onClick={onClick} />);

    await user.click(container.firstChild);
    expect(onClick).toHaveBeenCalledWith(true);
  });
});
