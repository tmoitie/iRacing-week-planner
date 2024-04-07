import React from 'react';
import { render } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import RemoveIcon from '../RemoveIcon';

describe('components/icon/RemoveIcon', () => {
  test('renders correctly', () => {
    const { container } = render(<RemoveIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
