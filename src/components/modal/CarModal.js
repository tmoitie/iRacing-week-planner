import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import classnames from 'classnames';

import allCars from '../../data/cars.json';

export default function CarModal({ onClose, ownedCars, favouriteCars, isOpen, carIds, seriesName }) {
  const cars = allCars.filter(car => carIds.includes(car.sku));
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('Cars for {{series}}', {
        series: t(seriesName),
      })}
      doneAction={onClose}
    >
      <div className='container-fluid'>
        <div className='table-responsive'>
          <table className='table' style={{ fontSize: '0.8em' }}>
            <thead>
              <tr>
                <th>{t('Car')}</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr
                  key={index}
                  className={classnames({
                  success: ownedCars.includes(car.sku),
                  'clickable-cell': true
                })}
                >
                  <td>
                    {favouriteCars.includes(car.sku) ? (
                      <span className='glyphicon glyphicon-star' />
                    ) : null}<span> </span>
                    {t(car.name)}
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

CarModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  favouriteCars: PropTypes.array,
  seriesName: PropTypes.string.isRequired,
  ownedCars: PropTypes.array,
  carIds: PropTypes.array,
};

CarModal.defaultProps = {
  onClose: () => {},
  isOpen: false,
  favouriteCars: [],
  ownedCars: [],
  carIds: [],
  seriesName: '',
};
