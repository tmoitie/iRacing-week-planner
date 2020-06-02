import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import purchaseOptimization from '../../lib/purchaseOptimization';
import '../styles/purchaseGuide.scss';

export function PurchaseGuideModal({ isOpen, onClose, ownedTracks, favouriteSeries }) {
  const purchaseItems = purchaseOptimization({ ownedTracks, favouriteSeries });
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Purchase Guide' doneAction={onClose}>
      <div className='container-fluid'>
        <p>
          {t('These unowned tracks from your favorite series appear multiple times for this season. You can purchase these tracks with the direct link.')}
        </p>
        <div className='table-responsive'>
          <table className='table purchase-table'>
            <thead>
            <tr>
              <th>{t('Count')}</th>
              <th>{t('Track')}</th>
              <th>{t('Series')}</th>
              <th>{t('Link')}</th>
            </tr>
            </thead>
            <tbody>
            {purchaseItems.map((item, index) => (
              <tr key={item.name}>
                <td>{item.count}</td>
                <td>{t(item.name)}</td>
                <td>
                  <ul>
                    {item.series.map((name) => <li key={name}>{t(name)}</li>)}
                  </ul>
                </td>
                <td>
                  <a
                    href={`https://members.iracing.com/membersite/member/TrackDetail.do?trkid=${item.id}`}
                    target='_blank'
                  >
                    <span className='glyphicon glyphicon-shopping-cart' />
                  </a>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}

PurchaseGuideModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  ownedTracks: PropTypes.array,
  favouriteSeries: PropTypes.array,
};
