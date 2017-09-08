import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import moment from 'moment';
import classnames from 'classnames';
import { intersection } from 'lodash';

import allCars from '../../data/cars.json';

const fixText = (text) => (decodeURIComponent(text).replace(/\+/g, ' '));

export default class CarModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    favouriteCars: PropTypes.array,
    seriesName: PropTypes.string.isRequired,
    ownedCars: PropTypes.array,
    carIds: PropTypes.array
  }

  static defaultProps = {
    onClose: () => {},
    isOpen: false,
    favouriteCars: [],
    ownedCars: [],
    carIds: [],
    seriesName: ''
  }

  render() {
    const { onClose, ownedCars, favouriteCars, isOpen, carIds, seriesName } = this.props;
    const cars = allCars.filter(car => carIds.includes(car.sku));

    return (
      <Modal isOpen={isOpen} onClose={onClose} title={`Cars for ${seriesName}`} doneAction={onClose}>
        <div className='container-fluid'>
          <div className='table-responsive'>
            <table className='table' style={{ fontSize: '0.8em' }}>
              <thead>
                <tr>
                  <th>Car</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr 
                    key={index}
                    className={classnames({
                    success: intersection(ownedCars, carIds).length !== 0,
                    'clickable-cell': true
                  })}
                  >
                    <td>
                      {intersection(favouriteCars, carIds).length !== 0 ? (
                        <span className='glyphicon glyphicon-star' />
                      ) : null}<span> </span>
                      {fixText(car.name)}
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
}
