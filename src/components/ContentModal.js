import React, { Component, PropTypes } from 'react';
import { cloneDeep, difference, isEqual } from 'lodash';
import update from 'react-addons-update';
import Modal from './modal/Modal';
import Checkbox from './Checkbox';
import FavouriteStarButton from './FavouriteStarButton';

const fixText = (text) => (decodeURIComponent(text).replace(/\+/g, ' '));

const toggleIdInCollection = (collection, id, newState) => {
  const newCollection = cloneDeep(collection);
  const index = newCollection.indexOf(id);

  if (index === -1 && newState) {
    newCollection.push(id);
  }
  if (index !== -1 && newState === false) {
    newCollection.splice(index, 1);
  }
  return newCollection;
};

export default class ContentModal extends Component {
  static propTypes = {
    title: PropTypes.string,
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
    saveFavourites: PropTypes.func
  }

  static defaultProps = {
    title: 'Set My Content',
    onClose: () => {},
    save: () => {},
    content: [],
    ownedContent: [],
    defaultContent: [],
    idField: 'sku',
    favourites: [],
    saveFavourites: () => {},
  }

  toggleContent(id, e) {
    const {ownedContent, save} = this.props;
    const newFavourites = toggleIdInCollection(ownedContent, id, e.target.checked);
    save(newFavourites);
  }

  toggleFavourite(id, newState, e) {
    e.preventDefault();
    const {favourites, saveFavourites} = this.props;
    const newFavourites = toggleIdInCollection(favourites, id, newState);
    saveFavourites(newFavourites);
  }

  toggleAllContent(e) {
    const {save, content, idField, defaultContent} = this.props;
    save(e.target.checked ? content.map(item => item[idField]) : defaultContent);
  }

  toggleAllFavourites(newState, e) {
    e.preventDefault();
    const {saveFavourites, content, idField} = this.props;
    saveFavourites(newState ? content.map(item => item[idField]) : []);
  }

  setAllTypeContent(type, e) {
    const { ownedContent, save, defaultContent } = this.props;
    save(this.toggleAllTypeInCollection(type, e.target.checked, ownedContent, defaultContent));
  }

  setAllTypeFavourites(type, newState, e) {
    e.preventDefault();
    const { favourites, saveFavourites } = this.props;
    saveFavourites(this.toggleAllTypeInCollection(type, newState, favourites, []));
  }

  toggleAllTypeInCollection(type, newState, currentCollection, defaultContent) {
    const allIdsOfType = this.getAllIdsOfType(type);

    if (newState) {
      const addValues = difference(allIdsOfType, currentCollection);
      const newValues = cloneDeep(currentCollection);
      newValues.push(...addValues);
      return newValues;
    }

    return difference(currentCollection, difference(allIdsOfType, defaultContent));
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

  getAllIdsOfType(type) {
    const { typeFilter, content, idField } = this.props;

    if (!typeFilter) {
      return [9999];
    }

    const { key } = typeFilter;
    const value = typeFilter[type];
    return content.filter(item => isEqual(item[key], value)).map(item => item[idField]);
  }

  render() {
    const {onClose, title, content, ownedContent, save, idField, defaultContent, favourites} = this.props;
    return (
      <Modal onClose={onClose} title={title} doneAction={onClose}>
        <div className="container-fluid">
          <p>Use the checkbox to set the content you own, and the star to set your favourite content.</p>
          <div className="row">
            <div className="col-sm-4">
              <Checkbox checked={ownedContent.length === content.length}
                onChange={this.toggleAllContent.bind(this)}>
                Select All

                <span> </span>

                <FavouriteStarButton
                  enabled={favourites.length === content.length}
                  onClick={this.toggleAllFavourites.bind(this)} />
              </Checkbox>
            </div>
            <div className="col-sm-4">
              <Checkbox checked={this.allTypeContentChecked('oval')}
                onChange={this.setAllTypeContent.bind(this, 'oval')}>
                Select All Oval

                <span> </span>

                <FavouriteStarButton
                  enabled={this.allTypeFavouritesChecked('oval')}
                  onClick={this.setAllTypeFavourites.bind(this, 'oval')} />
              </Checkbox>
            </div>
            <div className="col-sm-4">
              <Checkbox checked={this.allTypeContentChecked('road')}
                onChange={this.setAllTypeContent.bind(this, 'road')}>
                Select All Road

                <span> </span>

                <FavouriteStarButton
                  enabled={this.allTypeFavouritesChecked('road')}
                  onClick={this.setAllTypeFavourites.bind(this, 'road')} />
              </Checkbox>
            </div>
          </div>

          <hr />

          <div className="row">
            {content.map((item, index) => {
              return (
                <div className="col-md-6" key={index}>
                  <Checkbox disabled={
                      ownedContent.indexOf(item[idField]) !== -1 && defaultContent.indexOf(item[idField]) !== -1
                    }
                    checked={ownedContent.indexOf(item[idField]) !== -1}
                    onChange={this.toggleContent.bind(this, item[idField])}>
                    {item.skuname ? fixText(item.skuname) : fixText(item.name)}

                    <span> </span>

                    <FavouriteStarButton
                      enabled={favourites.indexOf(item[idField]) !== -1}
                      onClick={this.toggleFavourite.bind(this, item[idField])} />
                  </Checkbox>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    );
  }
}
