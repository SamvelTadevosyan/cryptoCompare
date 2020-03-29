// @flow
import React from 'react';
import omit from 'lodash-es/omit';

import { isFunction, func } from 'src/utils/misk';

import { FlexBox } from 'src/styles/styled-components';

type ItemProps = {
  data?: any,
  children: any,
  disabled?: boolean,
  onClick?: (data: any, e: SyntheticEvent<>) => void,
}

const Item = (props: ItemProps) => {
  const { onClick, data, disabled } = props;

  const handleOnclick = (e: SyntheticEvent<>) => {
    if (onClick && isFunction(onClick) && !disabled) {
      e.persist();
      onClick(data, e);
    }
  };

  return (
    <FlexBox
      onClick={handleOnclick}
      {...omit(props, ['onClick', 'data', 'disabled'])}
    >
      {props.children}
    </FlexBox>
  );
};

Item.defaultProps = {
  data: null,
  onClick: func,
  disabled: false,
};

export default Item;
