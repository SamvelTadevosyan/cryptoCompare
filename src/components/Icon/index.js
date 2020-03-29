// @flow
import React, { PureComponent } from 'react';
import { func } from 'src/utils';

import Icons from './icons';
import { SvgStyled } from './styled';

type IconProps = {
  name?: string,
  size?: number,
  color?: string,
  cursor?: string,
  onClick?: (e: Event) => void,
};

type IconState = {};

export default class Icon extends PureComponent<IconProps, IconState> {
  static defaultProps = {
    size: 16,
    name: 'check',
    onClick: func,
    color: '#165798',
    cursor: 'pointer',
  };

  render() {
    const {
      name,
      size,
      color,
      cursor,
      onClick,
    } = this.props;

    return !!Icons[name] && (
      <SvgStyled color={color} width={size} height={size} onClick={onClick} cursor={cursor}>
        <use xlinkHref={`#${Icons[name].id}`} />
      </SvgStyled>
    );
  }
}

// const Icon = (props: IconProps) => {
//   const {
//     name,
//     size,
//     color,
//     cursor,
//     onClick,
//   } = props;
//
//   return !!Icons[name] && (
//     <SvgStyled color={color} width={size} height={size} onClick={onClick} cursor={cursor}>
//       <use xlinkHref={`#${Icons[name].id}`} />
//     </SvgStyled>
//   );
// };
//
// Icon.defaultProps = {
//   size: 16,
//   name: 'check',
//   onClick: func,
//   color: '#165798',
// };

// export default Icon;
