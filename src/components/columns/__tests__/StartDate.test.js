import moment from 'moment';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';

import StartDate from '../StartDate';

describe('components/columns/StartDate', () => {
  test('renders correctly', () => {
    render(
      <TableWrapper>
        <StartDate
          race={{
            startTime: moment('2020-09-22T01:00:00.000Z').utc(),
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.getByTestId('table-row').firstChild).toHaveTextContent('9/22/2020'); // Node uses US I18n DateFormat
  });
});
