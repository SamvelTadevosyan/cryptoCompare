import styled from 'styled-components';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  cursor: 'pointer',
  theme: defaultTheme,
};

const fillColor = ({ color }) => `
  fill: ${color};
`;

const cursor = ({ cursor }) => `
  cursor: ${cursor};
`;

const SvgStyled = styled.svg`
  ${cursor}
  ${fillColor}
`;

SvgStyled.displayName = 'SvgStyled';
SvgStyled.defaultProps = defaultProps;

export default SvgStyled;
