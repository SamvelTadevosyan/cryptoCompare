import styled from 'styled-components';
import { getColor } from 'src/styles/utils';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const isValid = ({ isValid, theme }) => `
  ${typeof isValid === 'boolean' && !isValid ? `border-color: ${theme.color.red};` : ''}
`;

const required = ({ required, isLabel }) => `
  ${required ? `
    &::before {
      content: '*';
      color: #DC291E;
      font-size: 21px;
      display: block;
      position: absolute;
      top: ${isLabel ? '10px;' : '-20px;'}
      right: 0;
    }
  ` : ''}
`;

const isOpen = ({ isOpen, theme }) => `
  ${isOpen ? `
    border-color: ${theme.colors.lightGrey};
  ` : ''}
`;

const disabled = ({ disabled }) => `
  ${disabled ? `
    cursor: not-allowed;
  ` : `
      &:hover {
        border: 2px solid ${getColor('darkBlue')};
      }
  `}
`;

const DropdownStyled = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  height: 48px;
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
  padding: 12px;
  position: relative;
  border-radius: 4px;
  justify-content: space-between;
  color: ${getColor('lightGrey')};
  border: 1px solid ${getColor('blue')};

  ${isOpen}
  ${isValid}
  ${required}
  ${disabled}
`;

DropdownStyled.displayName = 'DropdownStyled';
DropdownStyled.defaultProps = defaultProps;

export default DropdownStyled;
