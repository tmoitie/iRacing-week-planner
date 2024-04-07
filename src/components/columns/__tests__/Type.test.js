import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';

import Type from '../Type';

describe('components/columns/Type', () => {
  test('renders correctly', () => {
    render(<TableWrapper><Type race={{ type: 'RX' }} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.getByTestId('table-row').firstChild).toHaveTextContent('RX');
  });
});
