import React, { Component, PropTypes } from 'react';
import SeriesModal from '../modal/SeriesModal';

export default class Series extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    favouriteSeries: PropTypes.array.isRequired,
    ownedTracks: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  renderModal() {
    const { ownedTracks, race: { seriesId } } = this.props;
    const { modalOpen } = this.state;
    return (
      <SeriesModal isOpen={modalOpen} onClose={this.closeModal} ownedTracks={ownedTracks} seriesId={seriesId} />
    );
  }

  render() {
    const { race, favouriteSeries } = this.props;

    return (
      <td className='clickable-cell' onClick={this.openModal}>
        <div>
          {favouriteSeries.indexOf(race.seriesId) !== -1 ? (
            <span className='glyphicon glyphicon-star' />
          ) : null}

          <span> </span>

          {race.series}
        </div>
        {this.renderModal()}
      </td>
    );
  }
}
