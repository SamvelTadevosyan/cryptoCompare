import styled from 'styled-components';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
};

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 48px;
  width: 100%;
`;

Container.displayName = 'Container';
Container.defaultProps = defaultProps;

export default Container;
