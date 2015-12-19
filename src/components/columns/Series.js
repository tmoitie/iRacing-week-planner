import React, { Component, PropTypes } from 'react';
import SeriesModal from '../modal/SeriesModal';

export default class Series extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    favouriteSeries: PropTypes.array.isRequired,
    ownedTracks: PropTypes.array.isRequired
  }

  static contextTypes = {
    renderModal: PropTypes.func,
    closeModal: PropTypes.func
  }

  showSeriesModal(seriesId) {
    const { renderModal, closeModal } = this.context;
    const { ownedTracks } = this.props;
    renderModal(
      <SeriesModal onClose={closeModal} ownedTracks={ownedTracks} seriesId={seriesId} />
    );
  }

  render() {
    const { race, favouriteSeries } = this.props;

    return (
      <td className='series' onClick={this.showSeriesModal.bind(this, race.seriesId)}>
        {favouriteSeries.indexOf(race.seriesId) !== -1 ? (
          <span className='glyphicon glyphicon-star' />
        ) : null}

        <span> </span>

        {race.series}
      </td>
    );
  }
}
