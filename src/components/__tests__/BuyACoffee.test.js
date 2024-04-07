import React from 'react';
import { create, act } from 'react-test-renderer';
import { describe, test } from '@jest/globals';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import BuyACoffee from '../BuyACoffee';

jest.mock('react-i18next');
jest.mock('axios');

describe('components/BuyACoffee', () => {
  test('opens link with error', async () => {
    let component;

    act(() => {
      component = create(<BuyACoffee />);
    });

    const setLanguage = (language) => {
      useTranslation.mockImplementationOnce(() => ({
        t: (value) => value,
        i18n: { language },
      }));

      act(() => {
        component.update(<BuyACoffee />);
      });
    };

    const clickButtonError = async (language) => {
      axios.get.mockRejectedValueOnce(new Error('Not found'));

      await act(async () => {
        await component.root.findByType('button').props.onClick();
      });

      expect(axios.get).toHaveBeenCalled();
    };

    setLanguage('en');
    await clickButtonError();
    expect(window.location.assign).toHaveBeenCalledWith('https://www.buymeacoffee.com/tmoitie');

    setLanguage('en-GB');
    await clickButtonError();
    expect(window.location.assign).toHaveBeenCalledWith('https://www.buymeacoffee.com/iwpgbp');

    setLanguage('fr');
    await clickButtonError();
    expect(window.location.assign).toHaveBeenCalledWith('https://www.buymeacoffee.com/iwpeur');
  });

  test('opens link with geolocation', async () => {
    let component;

    act(() => {
      component = create(<BuyACoffee />);
    });

    const clickButtonWithCountry = async (countryCode) => {
      axios.get.mockResolvedValue({ data: { country_code: countryCode } });

      await act(async () => {
        await component.root.findByType('button').props.onClick();
      });

      expect(axios.get).toHaveBeenCalled();
    };

    expect(component.toJSON()).toMatchSnapshot();
    await clickButtonWithCountry('MX');
    expect(window.location.assign).toHaveBeenCalledWith('https://www.buymeacoffee.com/tmoitie');

    await clickButtonWithCountry('GB');
    expect(window.location.assign).toHaveBeenCalledWith('https://www.buymeacoffee.com/iwpgbp');

    await clickButtonWithCountry('FR');
    expect(window.location.assign).toHaveBeenCalledWith('https://www.buymeacoffee.com/iwpeur');
  });
});
