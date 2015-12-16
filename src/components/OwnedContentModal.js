import React, { Component, PropTypes } from 'react';
import { cloneDeep, difference, isEqual } from 'lodash';
import update from 'react-addons-update';
import Modal from './modal/Modal';
import Checkbox from './Checkbox';

const fixText = (text) => (decodeURIComponent(text).replace(/\+/g, ' '));

export default class OwnedContentModal extends Component {
  static propTypes = {
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
    })
  }

  static defaultProps = {
    onClose: () => {},
    save: () => {},
    content: [],
    ownedContent: [],
    defaultContent: [],
    idField: 'sku'
  }

  setCheckboxContent(id, e) {
    const {ownedContent, save} = this.props;
    const newOwned = cloneDeep(ownedContent);
    const index = newOwned.indexOf(id);

    if (index === -1 && e.target.checked) {
      newOwned.push(id);
    }
    if (index !== -1 && e.target.checked === false) {
      newOwned.splice(index, 1);
    }
    save(newOwned);
  }

  setAllContent(e) {
    const {save, content, idField, defaultContent} = this.props;
    if (e.target.checked) {
      save(content.map(item => item[idField]));
      return;
    }
    save(defaultContent);
  }

  setAllType(type, e) {
    const { ownedContent, save, defaultContent } = this.props;
    const allIdsOfType = this.getAllIdsOfType(type);

    if (e.target.checked) {
      const addValues = difference(allIdsOfType, ownedContent);
      const newValues = cloneDeep(ownedContent);
      newValues.push(...addValues);
      save(newValues);
      return;
    }

    const removedValues = difference(ownedContent, difference(allIdsOfType, defaultContent));
    save(removedValues);
  }

  allTypeChecked(type) {
    const { ownedContent } = this.props;
    const allIdsOfType = this.getAllIdsOfType(type);
    return difference(allIdsOfType, ownedContent).length === 0;
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
    const {onClose, content, ownedContent, save, idField, defaultContent} = this.props;
    return (
      <Modal onClose={onClose} title='Choose owned content' doneAction={onClose}>
        <div className="container-fluid">

          <div className="row">
            <div className="col-sm-4">
              <Checkbox checked={ownedContent.length === content.length}
                onChange={this.setAllContent.bind(this)}>
                Select All
              </Checkbox>
            </div>
            <div className="col-sm-4">
              <Checkbox checked={this.allTypeChecked('oval')}
                onChange={this.setAllType.bind(this, 'oval')}>
                Select All Oval
              </Checkbox>
            </div>
            <div className="col-sm-4">
              <Checkbox checked={this.allTypeChecked('road')}
                onChange={this.setAllType.bind(this, 'road')}>
                Select All Road
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
                    onChange={this.setCheckboxContent.bind(this, item[idField])}>
                    {item.skuname ? fixText(item.skuname) : fixText(item.name)}
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
