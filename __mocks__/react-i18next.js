import * as React from 'react';

export function useTranslation() {
  return {
    t: (key) => (key),
  };
}
export function withTranslation() {
  return (Component) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  };
}
