import React, { Component } from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash.difference';
import isEqual from 'lodash.isequal';
import { withTranslation } from 'react-i18next';
import toggleIdInCollection from '../../lib/toggleIdInCollection';
import Modal from './Modal';
import Checkbox from '../Checkbox';
import FavouriteStarButton from '../FavouriteStarButton';

export class ContentModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    save: PropTypes.func,
    content: PropTypes.array,
    ownedContent: PropTypes.array,
    defaultContent: PropTypes.array,
    idField: PropTypes.string,
    typeFilter: PropTypes.shape({
      key: PropTypes.string,
      oval: PropTypes.any,
      road: PropTypes.any
    }),
    favourites: PropTypes.array,
    saveFavourites: PropTypes.func,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isOpen: false,
    onClose: () => {},
    save: () => {},
    content: [],
    ownedContent: [],
    defaultContent: [],
    idField: 'sku',
    favourites: [],
    saveFavourites: () => {},
  }

  setAllTypeContent(type, newValue) {
    const { ownedContent, save, defaultContent } = this.props;
    save(this.toggleAllTypeInCollection(type, newValue, ownedContent, defaultContent));
  }

  setAllTypeFavourites(type, newState, e) {
    e.preventDefault();
    const { favourites, saveFavourites } = this.props;
    saveFavourites(this.toggleAllTypeInCollection(type, newState, favourites, []));
  }

  getAllIdsOfType(type) {
    const { typeFilter, content, idField } = this.props;

    if (!typeFilter) {
      return [9999];
    }

    const { key } = typeFilter;
    const value = typeFilter[type];
    return content.filter(item => isEqual(item[key], value)).map(item => item[idField]);
  }

  allTypeContentChecked(type) {
    const { ownedContent } = this.props;
    const allIdsOfType = this.getAllIdsOfType(type);
    return difference(allIdsOfType, ownedContent).length === 0;
  }

  allTypeFavouritesChecked(type) {
    const { favourites } = this.props;
    const allIdsOfType = this.getAllIdsOfType(type);
    return difference(allIdsOfType, favourites).length === 0;
  }

  toggleAllTypeInCollection(type, newState, currentCollection, defaultContent) {
    const allIdsOfType = this.getAllIdsOfType(type);

    if (newState) {
      const addValues = difference(allIdsOfType, currentCollection);

      return [...currentCollection, ...addValues];
    }

    return difference(currentCollection, difference(allIdsOfType, defaultContent));
  }

  toggleContent(id, newValue) {
    const { ownedContent, save } = this.props;
    const newFavourites = toggleIdInCollection(ownedContent, id, newValue);
    save(newFavourites);
  }

  toggleFavourite(id, newState, e) {
    e.preventDefault();
    const { favourites, saveFavourites } = this.props;
    const newFavourites = toggleIdInCollection(favourites, id, newState);
    saveFavourites(newFavourites);
  }

  toggleAllContent(newValue) {
    const { save, content, idField, defaultContent } = this.props;
    save(newValue ? content.map(item => item[idField]) : defaultContent);
  }

  toggleAllFavourites(newState, e) {
    e.preventDefault();
    const { saveFavourites, content, idField } = this.props;
    saveFavourites(newState ? content.map(item => item[idField]) : []);
  }

  render() {
    const { onClose, title, content, ownedContent, isOpen, idField, defaultContent, favourites, t } = this.props;
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={title} doneAction={onClose}>
        <div className='container-fluid'>
          <p>{t('Use the checkbox to set the content you own, and use the star to set your favourite content.')}</p>
          <div className='row'>
            <div className='col-sm-4'>
              <Checkbox
                checked={ownedContent.length === content.length}
                onChange={this.toggleAllContent.bind(this)}
              >
                {t('Select all')}

                <span> </span>

                <FavouriteStarButton
                  enabled={favourites.length === content.length}
                  onClick={this.toggleAllFavourites.bind(this)}
                />
              </Checkbox>
            </div>
            <div className='col-sm-4'>
              <Checkbox
                checked={this.allTypeContentChecked('oval')}
                onChange={this.setAllTypeContent.bind(this, 'oval')}
              >
                {t('Select all oval')}

                <span> </span>

                <FavouriteStarButton
                  enabled={this.allTypeFavouritesChecked('oval')}
                  onClick={this.setAllTypeFavourites.bind(this, 'oval')}
                />
              </Checkbox>
            </div>
            <div className='col-sm-4'>
              <Checkbox
                checked={this.allTypeContentChecked('road')}
                onChange={this.setAllTypeContent.bind(this, 'road')}
              >
                {t('Select all road')}

                <span> </span>

                <FavouriteStarButton
                  enabled={this.allTypeFavouritesChecked('road')}
                  onClick={this.setAllTypeFavourites.bind(this, 'road')}
                />
              </Checkbox>
            </div>
          </div>

          <hr />

          <div className='row'>
            {content.map((item, index) => (
              <div className='col-md-6' key={index}>
                <Checkbox
                  disabled={
                    ownedContent.indexOf(item[idField]) !== -1 && defaultContent.indexOf(item[idField]) !== -1
                  }
                  checked={ownedContent.indexOf(item[idField]) !== -1}
                  onChange={this.toggleContent.bind(this, item[idField])}
                >
                  { item.skuname ? t(item.skuname) : t(item.name) }

                  <span> </span>

                  <FavouriteStarButton
                    enabled={favourites.indexOf(item[idField]) !== -1}
                    onClick={this.toggleFavourite.bind(this, item[idField])}
                  />
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    );
  }
}

export default withTranslation()(ContentModal);
