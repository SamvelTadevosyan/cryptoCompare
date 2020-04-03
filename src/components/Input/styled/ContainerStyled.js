import styled from 'styled-components';
import { FlexBox } from 'src/styles/styled-components';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
  vertical: true,
  noShrink: true,
  noGrow: true,
};

const disabled = ({ disabled }) => `
  ${disabled ? `
    opacity: 0.3;
  ` : ''}
`;

const marginTop = ({ margin }) => `
  ${margin ? `
    margin-top: 10px;
  ` : ''}
`;

const ContainerStyled = styled(FlexBox)`
  width: 100%;
  ${marginTop}
  ${disabled}
`;

ContainerStyled.displayName = 'ContainerStyled';
ContainerStyled.defaultProps = defaultProps;

export default ContainerStyled;
