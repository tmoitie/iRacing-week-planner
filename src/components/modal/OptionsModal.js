import React, { Component, PropTypes } from 'react';
import { cloneDeep } from 'lodash';
import Modal from './Modal';
import Checkbox from '../Checkbox';
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
    columnIds: PropTypes.array,
    saveColumns: PropTypes.func
  }

  static defaultProps = {
    onClose: () => {},
    columnIds: [],
    saveColumns: () => {},
  }

  toggleColumn(id, e) {
    const {columnIds, saveColumns} = this.props;
    const newColumns = toggleIdInCollection(columnIds, id, e.target.checked);
    console.log(newColumns);
    saveColumns(newColumns);
  }

  render() {
    const {onClose, columnIds} = this.props;
    return (
      <Modal onClose={onClose} title='Options' doneAction={onClose}>
        <div className='container-fluid'>
          <h5>Columns</h5>
          <div className='row'>
            {availableColumns.map((column, index) => {
              return (
                <div className='col-xs-3 col-md-2' key={index}>
                  <Checkbox disabled={column.forced === true}
                    checked={columnIds.indexOf(column.id) !== -1}
                    onChange={this.toggleColumn.bind(this, column.id)}>
                    {column.header}
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
