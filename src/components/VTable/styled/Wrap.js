import styled from 'styled-components';
import defaultTheme from 'src/styles/theme';
import { getColor } from 'src/styles/utils';

const defaultProps = {
  theme: defaultTheme,
};

const cursor = ({ pointer }) => `
  ${pointer ? 'cursor: pointer' : ''}
`;

const border = ({ border }) => `
  ${border ? `border: ${border};` : ''}
`;

const backgroundColor = ({ backgroundColor }) => `
  ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
`;

const HeaderBackgroundColor = ({ headerBackgroundColor }) => `
  background-color: ${headerBackgroundColor || getColor('blue')};
`;

const bgColor = getColor('lightBlue');

const Wrap = styled.div`
  position: relative;
  .ReactVirtualized__Table__Grid {
    ${border}
    ${backgroundColor}
  }

  .ReactVirtualized__Table__row {
    display: flex;
    outline: none;
    border-bottom: 1px solid rgba(84,84,84,0.56);
    
    ${cursor}
       
    &:hover {
      background-color: ${bgColor};
    }
  }
  
  .ReactVirtualized__Table__headerRow {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    color: ${getColor('white')};
    
    ${HeaderBackgroundColor}
  }
  
  .ReactVirtualized__Table__rowColumn, .ReactVirtualized__Table__headerColumn {
    padding: 0 10px;
    overflow: hidden;
    align-self: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .selected {
    background-color: ${bgColor};
  }
  
  .noPadding {
    padding: 0 !important;
  }
`;

Wrap.displayName = 'VTableWrapperStyled';
Wrap.defaultProps = defaultProps;

export default Wrap;
