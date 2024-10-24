import React from 'react';
import { render } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import TickIcon from '../TickIcon';

describe('components/icon/TickIcon', () => {
  test('renders correctly', () => {
    const { container } = render(<TickIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
