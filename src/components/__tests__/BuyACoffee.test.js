import React from 'react';
import { create, act } from 'react-test-renderer';
import { describe, test } from '@jest/globals';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import BuyACoffee from '../BuyACoffee';

describe('components/BuyACoffee', () => {
  test('opens link', async () => {
    const component = create(<BuyACoffee />);

    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await component.root.findByType('button').props.onClick();
    });

    expect(window.location.assign).toHaveBeenCalledWith('https://www.buymeacoffee.com/tmoitie');
  });
});
