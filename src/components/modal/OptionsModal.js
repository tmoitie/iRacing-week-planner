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
    saveOptions: PropTypes.func,
    mode: PropTypes.string
  }

  static defaultProps = {
    onClose: () => {},
    isOpen: false,
    columnIds: [],
    saveOptions: () => {},
    mode: 'both'
  }

  toggleColumn(id, e) {
    const {columnIds, saveOptions} = this.props;
    const newColumns = toggleIdInCollection(columnIds, id, e.target.checked);
    saveOptions('columns', newColumns);
  }

  toggleMode(newMode, e) {
    const {saveOptions} = this.props;
    if (e.target.value === 'on') {
      saveOptions('mode', newMode);
    }
  }

  render() {
    const {onClose, isOpen, columnIds, mode} = this.props;
    return (
      <Modal isOpen={isOpen} onClose={onClose} title='Options' doneAction={onClose}>
        <div className='container-fluid'>
          <h5>Mode</h5>
          <div className='row'>
            <div className='col-xs-3 col-md-2'>
              <Radio name='mode' selected={mode === 'both'}
                onChange={this.toggleMode.bind(this, 'both')}>
                Both
              </Radio>
            </div>
            <div className='col-xs-3 col-md-2'>
              <Radio name='mode' selected={mode === 'road'}
                onChange={this.toggleMode.bind(this, 'road')}>
                Road
              </Radio>
            </div>
            <div className='col-xs-3 col-md-2'>
              <Radio name='mode' selected={mode === 'oval'}
                onChange={this.toggleMode.bind(this, 'oval')}>
                Oval
              </Radio>
            </div>
          </div>
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
