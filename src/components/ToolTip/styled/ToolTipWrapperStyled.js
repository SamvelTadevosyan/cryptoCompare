import styled from 'styled-components';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const setPosition = ({ vertical, horizontal, fromX, fromY }) => `
  ${fromX}: ${horizontal}px;
  ${fromY}: ${vertical}px;
`;


const width = ({ width }) => `
  ${width
    ? `width: ${width}px;`
    : ''}
`;

const ToolTipWrapperStyled = styled.div`
  padding: 2px;
  z-index: 9999;
  color: #4f4f56;
  font-size: 14px;
  position: absolute;
  border-radius: 2px;
  background: #ffffff;
  word-wrap: break-word;
  border: 1px #4f4f56 solid;
  box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.13);
  
  animation: fadein 0.5s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
  ${width}
  ${setPosition}
`;

ToolTipWrapperStyled.displayName = 'ToolTipWrapperStyled';
ToolTipWrapperStyled.defaultProps = defaultProps;

export default ToolTipWrapperStyled;
