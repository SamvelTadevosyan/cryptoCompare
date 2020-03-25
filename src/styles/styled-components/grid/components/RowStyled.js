import styled from 'styled-components';
import FlexBox from '../../flex-box';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  theme: defaultTheme,
  noWrap: false,
};

const wrap = ({ noWrap }) => `
  ${noWrap ? '' : 'flex-wrap: wrap;'}
`;

const RowStyled = styled(FlexBox)`
  margin-right: -.5rem;
  margin-left: -.5rem;
  ${wrap}
`;

RowStyled.displayName = 'RowStyled';
RowStyled.defaultProps = defaultProps;

export default RowStyled;
