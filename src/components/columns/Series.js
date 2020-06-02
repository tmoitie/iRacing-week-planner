import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SeriesModal from '../modal/SeriesModal';

export default function Series({ race, favouriteSeries, ownedTracks }) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { t } = useTranslation();

  return (
    <td className='clickable-cell' onClick={openModal}>
      <div>
        {favouriteSeries.indexOf(race.seriesId) !== -1 ? (
          <span className='glyphicon glyphicon-star' />
        ) : null}

        <span> </span>

        {t(race.series)}
      </div>

      <SeriesModal isOpen={modalOpen} onClose={closeModal} ownedTracks={ownedTracks} seriesId={race.seriesId} />
    </td>
  );
}

Series.propTypes = {
  race: PropTypes.object.isRequired,
  favouriteSeries: PropTypes.array.isRequired,
  ownedTracks: PropTypes.array.isRequired
};
