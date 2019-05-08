import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarModal from '../modal/CarModal';
import classnames from 'classnames';
import { intersection } from 'lodash';

export default class Car extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    favouriteCars: PropTypes.array.isRequired,
    ownedCars: PropTypes.array.isRequired
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
    const { ownedCars, race, favouriteCars } = this.props;
    const { modalOpen } = this.state;
    return (
      <CarModal
        isOpen={modalOpen}
        onClose={this.closeModal}
        ownedCars={ownedCars}
        favouriteCars={favouriteCars}
        carIds={race.carIds}
        seriesName={race.series}
      />
    );
  }

  render() {
    const { ownedCars, race, favouriteCars } = this.props;

    return (
      <td
        className={classnames({
          success: intersection(ownedCars, race.carIds).length !== 0,
          'clickable-cell': true
        })}
        onClick={this.openModal}
      >
        <div>
          {intersection(favouriteCars, race.carIds).length !== 0 ? (
            <span className='glyphicon glyphicon-star' />
          ) : null}<span> </span>
          {race.carClasses.join(', ')}
        </div>
          {this.renderModal()}
      </td>
    );
  }
}
