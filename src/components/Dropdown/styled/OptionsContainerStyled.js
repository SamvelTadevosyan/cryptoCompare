import styled from 'styled-components';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const OptionsContainerStyled = styled.div`
  overflow-y: auto;
  height: 100%;
`;

OptionsContainerStyled.displayName = 'OptionsContainerStyled';
OptionsContainerStyled.defaultProps = defaultProps;

export default OptionsContainerStyled;
