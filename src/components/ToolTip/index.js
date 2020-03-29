// @flow
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { body } from 'src/utils';

import { ToolTipWrapperStyled } from './styled';
import { CalculatePosition } from './utils';

type ToolTipProps = {
  title: string,
  children: any,
  width?: number,
  position?: string,
  verticalFix?: number,
  horizontalFix?: number,
};

type ToolTipState = {
  isToolTipShow: boolean,
};

export default class ToolTip extends PureComponent<ToolTipProps, ToolTipState> {
  static defaultProps = {
    width: 0,
    verticalFix: 0,
    position: 'top',
    horizontalFix: 0,
  };

  timer: *;

  childRef: RefType<*>;

  container: HTMLDivElement;

  constructor(props: ToolTipProps) {
    super(props);

    this.state = {
      isToolTipShow: false,
    };

    this.childRef = React.createRef<*>();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleMouseEnter = () => {
    this.container = document.createElement('div');
    this.container.setAttribute('id', 'toolTip-container');
    body.appendChild(this.container);
    this.timer = setTimeout(() => {
      this.setState({ isToolTipShow: true });
    }, 500);
  };

  handleMouseLeave = () => {
    if (this.container && this.container.parentNode === body) {
      body.removeChild(this.container);
    }
    this.setState({ isToolTipShow: false });
    clearTimeout(this.timer);
  };

  renderToolTip = (domNewChildren: Object) => {
    const {
      width,
      title,
      position,
      verticalFix,
      horizontalFix,
    } = this.props;

    const {
      fromX,
      fromY,
      vertical,
      horizontal,
    } = CalculatePosition(
      domNewChildren,
      position,
      verticalFix,
      horizontalFix
    );

    return !!this.props.title && (
      <ToolTipWrapperStyled
        fromY={fromY}
        fromX={fromX}
        vertical={vertical}
        horizontal={horizontal}
        width={width}
      >
        {title}
      </ToolTipWrapperStyled>
    );
  };

  render() {
    const newChildren = React.cloneElement(this.props.children, {
      ref: this.childRef,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    });

    const domNewChildren = this.childRef.current && this.childRef.current.getBoundingClientRect();

    return (
      <>
        {newChildren}
        {domNewChildren && this.state.isToolTipShow && ReactDOM.createPortal(
          this.renderToolTip(domNewChildren),
          this.container
        )}
      </>
    );
  }
}
