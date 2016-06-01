import React, { Component, PropTypes } from 'react';
import Modal from '../modal/Modal';
import moment from 'moment';

export default class NextRace extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired
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
    const { race } = this.props;
    const weekStart = moment().utc().startOf('week')
      .add(1, 'day');
    const { modalOpen } = this.state;

    return (
      <Modal
        isOpen={modalOpen} onClose={this.closeModal} title={`Set times for ${race.series}`}
        doneAction={this.closeModal}
      >
        <div className='container-fluid'>
          <ul>
            {race.raceTimes.setTimes.map(
              (time, index) => <li key={index}>{
                moment(weekStart)
                  .add(time)
                  .local()
                  .format('ddd h:mma')
              }</li>
            )}
          </ul>
        </div>
      </Modal>
    );
  }

  render() {
    const { race } = this.props;

    if (race.raceTimes === null) {
      return <td>No time data</td>;
    }

    if (race.raceTimes.setTimes) {
      return (
        <td onClick={this.openModal} className='clickable-cell'>
          Set Times
          {this.renderModal()}
        </td>
      );
    }

    if (race.raceTimes.everyTime) {
      return (
        <td>
          <div>
            Every {race.raceTimes.everyTime.humanize().replace(/an?\s/, '')} starting
            at {moment().utc().startOf('day')
              .add(race.raceTimes.offset)
              .format('H:mm')}
          </div>
        </td>
      );
    }

    return <td>No time data</td>;
  }
}
