import styled from 'styled-components';
import { getColor } from 'src/styles/utils';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const size = ({ size }) => `
  left: ${size.left}px;
  width: ${size.width}px;
  top: ${size.top + size.height + 3}px;
`;

const height = ({ hasData }) => `
  max-height: ${hasData ? 180 : 50}px;
  height: auto;
`;

const OptionsContentStyled = styled.div`
  border-radius: 4px;
  box-sizing: border-box;
  background-color: ${getColor('white')};
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
  overflow-y: auto;
  position: absolute;
  z-index: 2000;
  
  &::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
    background-color: #F5F5F5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar{
    width: 5px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: ${getColor('main')};
  }
  
  ${size}
  ${height}
`;

OptionsContentStyled.displayName = 'OptionsContentStyled';
OptionsContentStyled.defaultProps = defaultProps;

export default OptionsContentStyled;
