import React, { Component, PropTypes } from 'react';
import Modal from '../modal/Modal';
import moment from 'moment';

export default class NextRace extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
  }

  static contextTypes = {
    renderModal: PropTypes.func,
    closeModal: PropTypes.func
  }

  openSetTimes() {
    const { renderModal, closeModal } = this.context;
    const { race } = this.props;
    const weekStart = moment().utc().startOf('week').add(1, 'day');
    renderModal(() => {
      return (
        <Modal onClose={closeModal} title={`Set times for ${race.series}`}
          doneAction={closeModal}>
          <div className='container-fluid'>
            <ul>
              {race.raceTimes.setTimes.map(
                (time, index) => <li key={index}>{moment(weekStart).add(time).local().format('ddd h:mma')}</li>
              )}
            </ul>
          </div>
        </Modal>
      );
    });
  }

  render() {
    const { race } = this.props;

    if (race.raceTimes === null) {
      return <td>No time data</td>;
    }

    if (race.raceTimes.setTimes) {
      return <td onClick={this.openSetTimes.bind(this)} className='clickable-cell'>Set Times</td>;
    }

    return (
      <td>
        Every {race.raceTimes.everyTime.humanize().replace(/an?\s/, '')} starting
        at {moment().utc().startOf('day').add(race.raceTimes.offset).format('H:mm')}
      </td>
    );
  }
}
