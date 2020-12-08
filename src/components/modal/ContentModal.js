// @flow

import * as React from 'react';
import difference from 'lodash.difference';
import isEqual from 'lodash.isequal';
import { useTranslation } from 'react-i18next';
import toggleIdInCollection from '../../lib/toggleIdInCollection';
import Modal from './Modal';
import Checkbox from '../Checkbox';
import FavouriteStarButton from '../FavouriteStarButton';
import styles from '../../styles/main.module.scss';
import contentModalStyles from './styles/contentModal.module.scss';

type Props = {
  id: string,
  isOpen: boolean,
  onClose: () => void,
  title: string,
  save: (Array<number>) => void,
  content: Array<{skuname?: string, name?: string}>,
  idField: string,
  defaultContent: Array<number>,
  ownedContent: Array<number>,
  favourites: Array<number>,
  saveFavourites: (Array<number>) => void,
  typeFilter: {
    key: string,
    oval: string,
    road: string,
  }
};

export default function ContentModal({
  id, isOpen, onClose, title, save, content, idField, defaultContent, ownedContent, favourites,
  saveFavourites, typeFilter,
}: Props) {
  const { t } = useTranslation();

  const toggleAllContent = (newValue) => {
    save(newValue ? content.map((item) => item[idField]) : defaultContent);
  };

  const getAllIdsOfType = (type) => {
    const { key } = typeFilter;
    const value = typeFilter[type];
    return content.filter((item) => isEqual(item[key], value)).map((item) => item[idField]);
  };

  const toggleAllTypeInCollection = (type, newState, currentCollection, passedDefaultContent) => {
    const allIdsOfType = getAllIdsOfType(type);

    if (newState) {
      const addValues = difference(allIdsOfType, currentCollection);

      return [...currentCollection, ...addValues];
    }

    return difference(currentCollection, difference(allIdsOfType, passedDefaultContent));
  };

  const setAllTypeContent = (type, newValue) => {
    save(toggleAllTypeInCollection(type, newValue, ownedContent, defaultContent));
  };

  const setAllTypeFavourites = (type, newState) => {
    saveFavourites(toggleAllTypeInCollection(type, newState, favourites, []));
  };

  const allTypeContentChecked = (type) => {
    const allIdsOfType = getAllIdsOfType(type);
    return difference(allIdsOfType, ownedContent).length === 0;
  };

  const allTypeFavouritesChecked = (type) => {
    const allIdsOfType = getAllIdsOfType(type);
    return difference(allIdsOfType, favourites).length === 0;
  };

  const toggleContent = (contentId, newValue) => {
    const newContent = toggleIdInCollection(ownedContent, contentId, newValue);
    save(newContent);
  };

  const toggleFavourite = (contentId, newState) => {
    const newFavourites = toggleIdInCollection(favourites, contentId, newState);
    saveFavourites(newFavourites);
  };

  const toggleAllFavourites = (newState) => {
    saveFavourites(newState ? content.map((item) => item[idField]) : []);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} doneAction={onClose}>
      <div className={styles['container-fluid']}>
        <p>{t('Use the checkbox to set the content you own, and use the star to set your favourite content.')}</p>
        <div className={styles.row}>
          <div className={`${contentModalStyles.checkboxContainer} ${styles['col-sm-4']}`}>
            <div>
              <Checkbox
                id={`${id}-select-all`}
                checked={ownedContent.length === content.length}
                onChange={toggleAllContent}
              >
                {t('Select all')}
              </Checkbox>
            </div> 

            <div className={contentModalStyles.favourite}>
              <FavouriteStarButton
                id={`${id}-favourite-all`}
                enabled={favourites.length === content.length}
                onClick={toggleAllFavourites}
              />
            </div>
          </div>
          <div className={`${contentModalStyles.checkboxContainer} ${styles['col-sm-4']}`}>
            <div>
              <Checkbox
                id={`${id}-select-oval`}
                checked={allTypeContentChecked('oval')}
                onChange={(newValue) => setAllTypeContent('oval', newValue)}
              >
                {t('Select all oval')}
              </Checkbox>
            </div> 

            <div className={contentModalStyles.favourite}>
              <FavouriteStarButton
                id={`${id}-favourite-oval`}
                enabled={allTypeFavouritesChecked('oval')}
                onClick={(newValue) => setAllTypeFavourites('oval', newValue)}
              />
            </div>
          </div>
          <div className={`${contentModalStyles.checkboxContainer} ${styles['col-sm-4']}`}>
            <div>
              <Checkbox
                id={`${id}-select-road`}
                checked={allTypeContentChecked('road')}
                onChange={(newValue) => setAllTypeContent('road', newValue)}
              >
                {t('Select all road')}
              </Checkbox>
            </div> 

            <div className={contentModalStyles.favourite}>
              <FavouriteStarButton
                id={`${id}-favourite-road`}
                enabled={allTypeFavouritesChecked('road')}
                onClick={(newValue) => setAllTypeFavourites('road', newValue)}
              />
            </div>
          </div>
        </div>

        <hr />

        <div className={styles.row}>
          {content.map((item) => (
            <div
              className={`${contentModalStyles.checkboxContainer} ${styles['col-md-6']}`}
              key={item[idField]}
            >
              <div>
                <Checkbox
                  id={`${id}-select-item-${item[idField]}`}
                  disabled={
                    ownedContent.indexOf(item[idField]) !== -1 && defaultContent.indexOf(item[idField]) !== -1
                  }
                  checked={ownedContent.indexOf(item[idField]) !== -1}
                  onChange={(newValue) => toggleContent(item[idField], newValue)}
                >
                  {item.skuname ? t(item.skuname) : t(item.name)}
                </Checkbox>
              </div> 

              <div className={contentModalStyles.favourite}>
                <FavouriteStarButton
                  id={`${id}-favourite-item-${item[idField]}`}
                  enabled={favourites.indexOf(item[idField]) !== -1}
                  onClick={(newValue) => toggleFavourite(item[idField], newValue)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
