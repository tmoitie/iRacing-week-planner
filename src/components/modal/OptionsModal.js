import React, { Component, PropTypes } from 'react';
import { cloneDeep } from 'lodash';
import Modal from './Modal';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import availableColumns from '../../data/availableColumns';

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

export default class OptionsModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    columnIds: PropTypes.array,
    saveOptions: PropTypes.func
  }

  static defaultProps = {
    onClose: () => {},
    isOpen: false,
    columnIds: [],
    saveOptions: () => {}
  }

  toggleColumn(id, e) {
    const { columnIds, saveOptions } = this.props;
    const newColumns = toggleIdInCollection(columnIds, id, e.target.checked);
    saveOptions('columns', newColumns);
  }

  render() {
    const { onClose, isOpen, columnIds } = this.props;
    return (
      <Modal isOpen={isOpen} onClose={onClose} title='Options' doneAction={onClose}>
        <div className='container-fluid'>
          <h5>Columns</h5>
          <div className='row'>
            {availableColumns.map((column, index) => (
              <div className='col-xs-3 col-md-2' key={index}>
                <Checkbox
                  disabled={column.forced === true}
                  checked={columnIds.indexOf(column.id) !== -1}
                  onChange={this.toggleColumn.bind(this, column.id)}
                >
                  {column.header}
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    );
  }
}
