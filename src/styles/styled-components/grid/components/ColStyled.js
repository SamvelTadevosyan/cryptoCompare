import styled from 'styled-components';
import media from 'styled-media-query';
import defaultTheme from 'src/styles/theme';
import FlexBox from '../../flex-box';

const defaultProps = {
  theme: defaultTheme,
  noShrink: true,
  noPadding: false,
};

const sizes = [
  '0%',
  '8.33333333%',
  '16.66666667%',
  '25%',
  '33.33333333%',
  '41.66666667%',
  '50%',
  '58.33333333%',
  '66.66666667%',
  '75%',
  '83.33333333%',
  '91.66666667%',
  '100%',
];

const getSize = sizeNumber => sizeNumber ? `
    flex-basis: ${sizes[sizeNumber]};
    max-width: ${sizes[sizeNumber]};
  ` : `
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
  `;

const getOffset = (offset) => offset ? `
    margin-left: ${sizes[offset]};
  ` : `
  `;

const xs = ({ xs, offset }) => `
  ${getSize(xs)}
  ${getOffset(offset)}
`;

const sm = ({ theme, xs, sm }) =>
  media.lessThan(theme.breakpoints.small)`
    ${getSize(sm || xs)}
  `;

const md = ({ theme, xs, sm, md }) =>
  media.lessThan(theme.breakpoints.medium)`
    ${getSize(md || sm || xs)}
  `;

const lg = ({
  theme, xs, sm, md, lg,
}) =>
  media.lessThan(theme.breakpoints.large)`
    ${getSize(lg || md || sm || xs)}
  `;

const padding = ({ noPadding }) => `
  ${!noPadding ? 'padding: 0 .5rem;' : ''}
`;

const ColStyled = styled(FlexBox)`
  box-sizing: border-box;
  flex: 0 0 auto;
  ${padding}
  ${lg}
  ${md}
  ${sm}
  ${xs}
`;

ColStyled.displayName = 'ColStyled';
ColStyled.defaultProps = defaultProps;

export default ColStyled;
