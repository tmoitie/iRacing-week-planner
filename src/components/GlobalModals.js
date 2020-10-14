// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeModal } from '../actions/app';
import { cars, tracks } from '../data';
import { defaultSettings } from '../reducers/settings';
import { updateSetting } from '../actions/settings';
import AboutModal from './modal/AboutModal';
import ContentModal from './modal/ContentModal';
import FavouriteSeriesModal from './modal/FavouriteSeriesModal';
import LoginModal from './modal/LoginModal';
import OptionsModal from './modal/OptionsModal';
import PurchaseGuideModal from './modal/PurchaseGuideModal';

const currentModalSelector = (state) => state.app.currentModal;
const settingsSelector = (state) => state.settings;

export default function GlobalModals() {
  const { t } = useTranslation();
  const currentModal = useSelector(currentModalSelector);
  const {
    favouriteSeries, ownedTracks, favouriteTracks, ownedCars, favouriteCars, columns,
  } = useSelector(settingsSelector, shallowEqual);
  const dispatch = useDispatch();

  const closeModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    dispatch(changeModal(null));
  };

  const getSettingUpdater = (key) => {
    return (value) => {
      dispatch(updateSetting(key, value));
    };
  };

  return (
    <>
      <FavouriteSeriesModal
        isOpen={currentModal === 'favourite-series'}
        onClose={closeModal}
        favouriteSeries={favouriteSeries}
        save={getSettingUpdater('favouriteSeries')}
      />
      <ContentModal
        id="content-modal-tracks"
        isOpen={currentModal === 'my-tracks'}
        onClose={closeModal}
        title={t('Set my tracks')}
        ownedContent={ownedTracks}
        content={tracks}
        idField="pkgid"
        defaultContent={[...defaultSettings.ownedTracks]}
        typeFilter={{ key: 'primaryType', oval: 'oval', road: 'road' }}
        save={getSettingUpdater('ownedTracks')}
        favourites={favouriteTracks}
        saveFavourites={getSettingUpdater('favouriteTracks')}
      />
      <ContentModal
        id="content-modal-cars"
        isOpen={currentModal === 'my-cars'}
        onClose={closeModal}
        title={t('Set my cars')}
        ownedContent={ownedCars}
        content={cars}
        idField="sku"
        defaultContent={[...defaultSettings.ownedCars]}
        typeFilter={{ key: 'discountGroupNames', oval: ['oval+car'], road: ['road+car'] }}
        save={getSettingUpdater('ownedCars')}
        favourites={favouriteCars}
        saveFavourites={getSettingUpdater('favouriteCars')}
      />
      <OptionsModal
        isOpen={currentModal === 'options'}
        onClose={closeModal}
        columnIds={columns}
        saveOptions={(key, value) => dispatch(updateSetting(key, value))}
      />
      <AboutModal
        isOpen={currentModal === 'about'}
        onClose={closeModal}
      />
      <PurchaseGuideModal
        isOpen={currentModal === 'purchase-guide'}
        onClose={closeModal}
        ownedTracks={ownedTracks}
        favouriteSeries={favouriteSeries}
      />
      <LoginModal
        isOpen={currentModal === 'login'}
        onClose={closeModal}
      />
    </>
  );
}
