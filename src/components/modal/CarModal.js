// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import StarIcon from '../icon/StarIcon';
import Modal from './Modal';

import raceListingStyles from '../styles/raceListing.module.scss';

import allCars from '../../data/cars.json';
import styles from '../../styles/main.module.scss';

type Props = {
  onClose: () => void,
  isOpen: boolean,
  ownedCars: Array<number>,
  favouriteCars: Array<number>,
  carIds: Array<number>,
  seriesName: string,
  seriesId: number,
};

export default function CarModal({ onClose, ownedCars, favouriteCars, isOpen, carIds, seriesName, seriesId }: Props) {
  const cars = [...allCars].sort((a, b) => a.name.localeCompare(b.name)).filter((car) => carIds.includes(car.sku));
  const { t } = useTranslation();

  return (
    <Modal
      id={`modal-cars-${seriesId}`}
      isOpen={isOpen}
      onClose={onClose}
      title={t('Cars for {{series}}', {
        series: t(seriesName),
      })}
      doneAction={onClose}
    >
      <div className={styles['container-fluid']}>
        <div className={styles['table-responsive']}>
          <table className={styles.table} style={{ fontSize: '0.8em' }}>
            <thead>
              <tr>
                <th>{t('Car')}</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car.name}
                  className={classnames({
                    [styles.success]: ownedCars.includes(car.sku),
                    [raceListingStyles.clickableCell]: true,
                  })}
                >
                  <td>
                    {favouriteCars.includes(car.sku) ? (
                      <StarIcon />
                    ) : null}
                    <span> </span>
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
