import styled from 'styled-components';
import { getColor } from 'src/styles/utils';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const selected = ({ selected }) => `
  ${selected ? 'background-color: #EBF1E6;' : ''}
`;

const OptionStyled = styled.div`
  color: ${getColor('title')};
  padding: 10px 20px;
  cursor: pointer;
  line-height: 19px;
  font-size: 16px;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover{
    background-color: #EBF1E6;
  }
  ${selected};
`;

OptionStyled.displayName = 'OptionStyled';
OptionStyled.defaultProps = defaultProps;

export default OptionStyled;
