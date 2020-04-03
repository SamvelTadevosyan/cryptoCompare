import styled from 'styled-components';
import { getColor } from 'src/styles/utils';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const LabelStyled = styled.span`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 4px;
  display: inline-block;
  color: ${getColor('black')};
`;

LabelStyled.displayName = 'LabelStyled';
LabelStyled.defaultProps = defaultProps;

export default LabelStyled;
