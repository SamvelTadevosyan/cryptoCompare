import styled from 'styled-components';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const border = ({ theme, error }) => `
  ${error ? `
    border-color: ${theme.colors.alert};
  ` : `
    border-color: ${theme.colors.blue};
  `}
`;

const disabled = ({ theme, disabled, error }) => `
  ${disabled ? `
    cursor: not-allowed;
  ` : `
      &:hover, &:focus {
        border: 2px solid;
        ${border({ theme, error })}
      }
  `}
`;

const textIndent = ({ textIndent }) => `
  ${textIndent ? `
    padding-left: ${textIndent};
    padding-right: ${textIndent};
  ` : ''}
`;

const InputStyled = styled.input`
  height: 48px;
  padding: 12px;
  font-size: 18px;
  line-height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  color: ${defaultTheme.colors.black};
  border: 1px solid;
  
  &::-ms-clear {
    display: none;
  }
  
  &[type=number]::-webkit-inner-spin-button, 
  &[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  
  ${textIndent}
  ${border}
  ${disabled}
`;

InputStyled.displayName = 'InputStyled';
InputStyled.defaultProps = defaultProps;

export default InputStyled;
