import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Type({ race }) {
  const { t } = useTranslation();
  return (
    <td><div>{t(race.type)}</div></td>
  );
}

Type.propTypes = {
  race: PropTypes.object.isRequired
};
