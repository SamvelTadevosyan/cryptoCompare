import styled from 'styled-components';
import { getColor } from 'src/styles/utils';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const ClearIconStyled = styled.div`
  top: 17px;
  right: 40px;
  width: 10px;
  height: 10px;
  cursor: pointer;
  position: absolute;
    
  &:after {
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    content: '';
    position: absolute;
    transform: rotate(-45deg);
    background-color: ${getColor('lightGrey')};
  }
  &:before {
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    content: '';
    position: absolute;
    transform: rotate(45deg);
    background-color: ${getColor('lightGrey')};
  }
`;

ClearIconStyled.displayName = 'ClearIconStyled';
ClearIconStyled.defaultProps = defaultProps;

export default ClearIconStyled;
