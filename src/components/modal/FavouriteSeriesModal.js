import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Modal from './Modal';
import Checkbox from '../Checkbox';
import series from '../../data/season.json';

const groupedSeries = series.reduce((grouped, single) => {
  if (single.catid === 1) {
    return {
      ...grouped,
      oval: [
        ...grouped.oval,
        single,
      ],
    };
  }
  if (single.catid === 3) {
    return {
      ...grouped,
      dirtOval: [
        ...grouped.dirtOval,
        single,
      ],
    };
  }
  if (single.catid === 4) {
    return {
      ...grouped,
      rx: [
        ...grouped.rx,
        single,
      ],
    };
  }
  return {
    ...grouped,
    road: [
      ...grouped.road,
      single,
    ],
  };
}, { oval: [], road: [], dirtOval: [], rx: [] });

export class FavouriteSeriesModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    save: PropTypes.func,
    favouriteSeries: PropTypes.array,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onClose: () => {},
    isOpen: false,
    save: () => {},
    favouriteSeries: []
  }

  setCheckboxFavourite(seriesId, newValue) {
    const { favouriteSeries, save } = this.props;
    const newFavorites = [ ...favouriteSeries ];
    const index = newFavorites.indexOf(seriesId);

    if (index === -1 && newValue) {
      newFavorites.push(seriesId);
    }
    if (index !== -1 && newValue === false) {
      newFavorites.splice(index, 1);
    }
    save(newFavorites);
  }

  renderCheckbox(cbSeries, index) {
    const { favouriteSeries, t } = this.props;
    return (
      <div className='col-md-6' key={index}>
        <Checkbox
          checked={favouriteSeries.indexOf(cbSeries.seriesid) !== -1}
          onChange={this.setCheckboxFavourite.bind(this, cbSeries.seriesid)}
        >
          {t(cbSeries.seriesname)}
        </Checkbox>
      </div>
    );
  }

  render() {
    const { onClose, isOpen, t } = this.props;
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={t('Choose favorite series')} doneAction={onClose}>
        <div className='container-fluid'>
          <h3>{t('Oval')}</h3>
          <div className='row'>
            {groupedSeries.oval.map(this.renderCheckbox.bind(this))}
          </div>
          <h3>{t('Road')}</h3>
          <div className='row'>
            {groupedSeries.road.map(this.renderCheckbox.bind(this))}
          </div>
          <h3>{t('Dirt Oval')}</h3>
          <div className='row'>
            {groupedSeries.dirtOval.map(this.renderCheckbox.bind(this))}
          </div>
          <h3>{t('RX')}</h3>
          <div className='row'>
            {groupedSeries.rx.map(this.renderCheckbox.bind(this))}
          </div>
        </div>
      </Modal>
    );
  }
}

export default withTranslation()(FavouriteSeriesModal);
