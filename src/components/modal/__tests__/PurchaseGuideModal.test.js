import { describe, test } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PurchaseGuideModal from '../PurchaseGuideModal';

describe('components/modal/PurchaseGuideModal', () => {
  test('saves the ignore past weeks preference', async () => {
    const user = userEvent.setup();
    const saveIgnorePastWeeks = jest.fn();

    render(
      <PurchaseGuideModal
        isOpen
        onClose={() => {}}
        ownedTracks={[]}
        favouriteSeries={[]}
        ignorePastWeeks
        saveIgnorePastWeeks={saveIgnorePastWeeks}
      />,
    );

    await user.click(screen.getByLabelText('Ignore past weeks'));

    expect(saveIgnorePastWeeks).toHaveBeenCalledWith(false);
  });
});
