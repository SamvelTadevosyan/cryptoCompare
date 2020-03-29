// @flow
import React from 'react';
import styled from 'styled-components';
import { needToShowIndicator } from 'src/utils';

import { FlexBox } from 'src/styles/styled-components';

import { SpinnerStyled } from './styled';

const IndicatorContainerStyled = styled(FlexBox)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(255,255,255,0.8);
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

type WrapperProps = {
  children: any,
  isBusy?: boolean,
}

const Wrapper = (props: WrapperProps) => {
  const { isBusy, ...otherProps } = props;

  return (
    <FlexBox position="relative" {...otherProps}>
      {props.children}
      {
        needToShowIndicator(isBusy) && (
          <IndicatorContainerStyled>
            <SpinnerStyled viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
              />
            </SpinnerStyled>
          </IndicatorContainerStyled>
        )
      }
    </FlexBox>
  );
};

Wrapper.defaultProps = {
  isBusy: false,
};

export default Wrapper;
