import styled from 'styled-components';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const LabelStyled = styled.label`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 4px;
  color: ${defaultTheme.colors.black};
  
`;

LabelStyled.displayName = 'LabelStyled';
LabelStyled.defaultProps = defaultProps;

export default LabelStyled;
