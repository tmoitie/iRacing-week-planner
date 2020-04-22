import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import purchaseOptimization from '../../lib/purchaseOptimization';
import '../styles/purchaseGuide.scss';

export default class PurchaseGuideModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    ownedTracks: PropTypes.array,
    favouriteSeries: PropTypes.array
  }

  render() {
    const {
      isOpen, onClose, ownedTracks, favouriteSeries
    } = this.props;

    const purchaseItems = purchaseOptimization({ ownedTracks, favouriteSeries });

    return (
      <Modal isOpen={isOpen} onClose={onClose} title='Purchase Guide' doneAction={onClose}>
        <div className='container-fluid'>
          <p>
            These
            <b>unowned tracks</b>
            {' '}
            from your
            <b>favorite series</b>
            {' '}
            appear multiple times for this season.
          </p>
          <p>It should worth buy them to optimize your budget and your season, via the direct link on the right.</p>
          <div className='table-responsive'>
            <table className='table purchase-table'>
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Track</th>
                  <th>Series</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {purchaseItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.count}</td>
                    <td>{item.name}</td>
                    <td>
                      <ul>
                        {item.series.map((name, index) => <li key={index}>{name}</li>)}
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
}
