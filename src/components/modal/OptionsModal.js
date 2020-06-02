import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import toggleIdInCollection from '../../lib/toggleIdInCollection';
import Modal from './Modal';
import Checkbox from '../Checkbox';
import availableColumns from '../../data/availableColumns';

export default function OptionsModal({ onClose, isOpen, columnIds, saveOptions }) {
  const getColumnToggler = (id) => (e) => {
    const newColumns = toggleIdInCollection(columnIds, id, e.target.checked);
    saveOptions('columns', newColumns);
  };

  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Options')} doneAction={onClose}>
      <div className='container-fluid'>
        <h5>{t('Columns')}</h5>
        <div className='row'>
          {availableColumns.map((column) => (
            <div className='col-xs-3 col-md-2' key={column.id}>
              <Checkbox
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

OptionsModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  columnIds: PropTypes.array,
  saveOptions: PropTypes.func,
};

OptionsModal.defaultProps = {
  onClose: () => {},
  isOpen: false,
  columnIds: [],
  saveOptions: () => {},
};
