import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';

import Fixed from '../Fixed';

describe('components/columns/Fixed', () => {
  test('renders true', () => {
    render(<TableWrapper><Fixed race={{ fixed: true }} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.queryByTestId('TickIcon')).toBeInTheDocument();
  });

  test('renders false', () => {
    render(<TableWrapper><Fixed race={{ fixed: false }} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.queryByTestId('TickIcon')).not.toBeInTheDocument();
  });
});
