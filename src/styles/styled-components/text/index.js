import styled from 'styled-components';
import defaultTheme from 'src/styles/theme';

const defaultProps = {
  size: 14,
  light: false,
  theme: defaultTheme,
  color: defaultTheme.colors.black
};

const margin = (props) => {
  const {
    mTop,
    mLeft,
    mRight,
    mBottom,
    horizontalM,
    verticalM,
    margin,
  } = props;

  return `
    ${mTop ? `margin-top: ${mTop}px;` : ''}
    ${mLeft ? `margin-left: ${mLeft}px;` : ''}
    ${mRight ? `margin-right: ${mRight}px;` : ''}
    ${mBottom ? `margin-bottom: ${mBottom}px;` : ''}
    ${horizontalM ? `margin: 0 ${horizontalM}px;` : ''}
    ${verticalM ? `margin: ${horizontalM}px 0;` : ''}
    ${margin ? `margin: ${margin}` : ''}
  `;
};

const padding = (props) => {
  const {
    pTop,
    pLeft,
    pRight,
    pBottom,
    horizontalP,
    verticalP,
    padding,
  } = props;

  return `
    ${pTop ? `padding-top: ${pTop}px;` : ''}
    ${pLeft ? `padding-left: ${pLeft}px;` : ''}
    ${pRight ? `padding-right: ${pRight}px;` : ''}
    ${pBottom ? `padding-bottom: ${pBottom}px;` : ''}
    ${horizontalP ? `padding: 0 ${horizontalP}px;` : ''}
    ${verticalP ? `padding: ${verticalP}px 0;` : ''}
    ${padding ? `padding: ${padding}` : ''}
  `;
};

const color = ({ color, theme }) => `
  color: ${theme.colors[color] || color};
`;

const font = ({ size, light, lineHeight, letterSpace, decoration, cursor, bold, background, fontStyle }) => `
  font-size: ${size}px;
  ${background ? `background-color: ${background};` : ''}
  ${light ? 'font-weight: 300;' : ''}
  ${bold ? 'font-weight: bold;' : ''}
  ${lineHeight ? `line-height: ${lineHeight}px;` : ''}
  ${letterSpace ? `letter-spacing: ${letterSpace}px;` : ''}
  ${decoration ? `text-decoration: ${decoration}` : ''}
  ${cursor ? `cursor: ${cursor}` : ''}
  ${fontStyle ? `font-style: ${fontStyle}` : ''}
`;

const truncate = ({ truncate, multiLine }) => truncate
  ? `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${multiLine ? `
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: ${multiLine};
      -webkit-box-orient: vertical;
    ` : ''}
  ` : '';

const Text = styled.span`
   ${font} 
   ${color}
   ${margin}
   ${padding}
   ${truncate}
`;

Text.displayName = 'Text';
Text.defaultProps = defaultProps;

export default Text;
