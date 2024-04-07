import moment from 'moment';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import { TableWrapper } from './ColumnUtils';
import '@testing-library/jest-dom';

import SeasonEnd from '../SeasonEnd';

describe('components/columns/SeasonEnd', () => {
  test('renders correctly', () => {
    render(
      <TableWrapper>
        <SeasonEnd
          race={{
            seriesEnd: moment('2020-09-26T01:00:00.000Z').utc(),
          }}
        />
      </TableWrapper>,
    );

    expect(screen.getByTestId('table-row').firstChild).toMatchSnapshot();
    expect(screen.getByTestId('table-row').firstChild).toHaveTextContent('9/26/2020'); // Node uses US I18n DateFormat
  });
});
