// @flow
import React, { PureComponent } from 'react';
import omit from 'lodash-es/omit';
import { Text } from 'src/styles/styled-components';

import { OptionStyled } from './styled';

type OptionProps = {
  data: any,
  label?: string,
  onClick: (data: any, e: SyntheticEvent<EventTarget>) => void
}

export default class Option extends PureComponent<OptionProps> {
  static defaultProps = {
    label: 'Label',
  };

  handleClick = (e: SyntheticEvent<EventTarget>) => {
    if (typeof this.props.onClick === 'function') {
      e.persist();
      this.props.onClick(this.props.data, e);
    }
  };

  getLabel = (): string => {
    const { data, label } = this.props;

    if (label) {
      return label;
    } else {
      return data && data.title;
    }
  };

  render() {
    return (
      <OptionStyled
        {...omit(this.props, ['label', 'onClick', 'data'])}
        onClick={this.handleClick}
      >
        <Text title={this.getLabel()} line={1}>{this.getLabel()}</Text>
      </OptionStyled>
    );
  }
}
