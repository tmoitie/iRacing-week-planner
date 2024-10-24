import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';
import { Licence } from '../index';

describe('components/columns/Licence', () => {
  test('renders correctly', () => {
    render(<TableWrapper><Licence race={{ licenceLevel: 7 }} /></TableWrapper>);

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
  });
});
