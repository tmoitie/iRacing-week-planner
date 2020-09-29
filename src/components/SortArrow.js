import React from 'react';

import type sort from '../reducers/settings';

type Props = {
  sort: sort,
};

export default function SortArrow({ sort }: Props): React.Node {
  if (sort.order === 'desc') {
    return <span className='glyphicon glyphicon-triangle-bottom' />;
  }

  return <span className='glyphicon glyphicon-triangle-top' />;
}
