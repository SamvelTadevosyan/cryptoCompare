/* @flow */
import * as React from 'react';
import throttle from 'lodash-es/throttle';

import {
  FlexBox,
} from 'src/styles/styled-components';

type IAutoSizerState = {
  parentSize: {
    width: number,
    height: number
  }
};

type IAutoSizerProps = {
  children: Array<React.Element<*>> & (parentSize: Object) => {},
}

export default class AutoSizer extends React.Component<IAutoSizerProps, IAutoSizerState> {
  __parentNode: RefType<FlexBox>;

  constructor(props: IAutoSizerProps) {
    super(props);

    this.__parentNode = React.createRef<FlexBox>();

    this.state = {
      parentSize: {
        width: 0,
        height: 0,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', throttle(this.resizeParent, 350));

    if (this.__parentNode) {
      this.resizeParent();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeParent);
  }

  resizeParent = () => {
    const { __parentNode } = this;

    if (__parentNode && __parentNode.current) {
      const { parentSize } = this.state;
      const { width, height } = __parentNode.current.getBoundingClientRect();
      parentSize.width = width || 0;
      parentSize.height = height || 0;

      this.setState({ parentSize });
    }
  };

  render() {
    const { parentSize } = this.state;
    const { children } = this.props;

    return (
      <FlexBox
        ref={this.__parentNode}
      >
        {children({ ...parentSize })}
      </FlexBox>
    );
  }
}
