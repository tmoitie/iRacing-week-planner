// @flow

import * as React from 'react';
import classNames from 'classnames';

import { createPortal } from 'react-dom';
import styles from '../../styles/main.module.scss';

type Props = {
  isOpen: boolean,
  onRequestClose: () => void,
  children: ?React.Node,
  className?: ?string,
  id: string,
};

const defaultProps = {
  className: null,
};

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export default function BaseModal({ isOpen, onRequestClose, children, id, className }: Props) {
  React.useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? onRequestClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onRequestClose]);

  const elementRef = React.useRef(document.getElementById(id));

  if (!elementRef.current && isOpen) {
    elementRef.current = createWrapperAndAppendToBody(id);
  }

  if (!isOpen || !elementRef.current) {
    return null;
  }

  return createPortal(
    <div
      className="ReactModal__Overlay"
      style={isOpen ? {
        position: 'fixed',
        display: 'block',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
      } : {
        position: 'inherit',
        display: 'none',
        inset: 'auto',
      }}
      onClick={() => { onRequestClose(); }}
    >
      <div
        data-testid={id}
        className={classNames('Modal__Bootstrap', styles['modal-dialog'], styles['modal-lg'], className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    elementRef.current,
  );
}

BaseModal.defaultProps = defaultProps;
