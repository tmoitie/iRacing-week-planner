
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';

import Id from '../Id';

describe('components/columns/Id', () => {
  test('renders correctly', () => {
    render(<TableWrapper><Id race={{ seriesId: 234 }} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.getByTestId('table-row').firstChild).toHaveTextContent('234');
  });
});
