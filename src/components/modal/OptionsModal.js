// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import toggleIdInCollection from '../../lib/toggleIdInCollection';
import Modal from './Modal';
import Checkbox from '../Checkbox';
import availableColumns from '../../data/availableColumns';

import styles from '../../styles/main.module.scss';

type Props = {
  onClose: () => void,
  isOpen?: boolean,
  columnIds?: Array<string>,
  saveOptions: (string, Array<string>) => void,
};

export default function OptionsModal({ onClose, isOpen, columnIds, saveOptions }: Props) {
  const getColumnToggler = (id) => (newValue) => {
    const newColumns = toggleIdInCollection(columnIds, id, newValue);
    saveOptions('columns', newColumns);
  };

  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Options')} doneAction={onClose}>
      <div className={styles['container-fluid']}>
        <h5>{t('Columns')}</h5>
        <div className={styles.row}>
          {availableColumns.map((column) => (
            <div className={`${styles['col-xs-3']} ${styles['col-md-2']}`} key={column.id}>
              <Checkbox
                id={`options-columns-${column.id}`}
                disabled={column.forced === true}
                checked={columnIds.indexOf(column.id) !== -1}
                onChange={getColumnToggler(column.id)}
              >
                {t(column.header)}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

OptionsModal.defaultProps = {
  isOpen: false,
  columnIds: [],
};
